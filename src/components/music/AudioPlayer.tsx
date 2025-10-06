import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Heart, X } from "lucide-react";

interface AudioPlayerProps {
  track: {
    id: string;
    title: string;
    artist: string;
    thumbnail_url: string;
    audio_url: string;
  };
  tracks: any[];
  onTrackChange: (track: any) => void;
  onClose: () => void;
}

const AudioPlayer = ({ track, tracks, onTrackChange, onClose }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.audio_url;
    audio.play();
    setIsPlaying(true);
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleNext);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleNext);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === track.id);
    if (currentIndex < tracks.length - 1) {
      onTrackChange(tracks[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex((t) => t.id === track.id);
    if (currentIndex > 0) {
      onTrackChange(tracks[currentIndex - 1]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/50 shadow-card z-40">
      <audio ref={audioRef} />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              {track.thumbnail_url ? (
                <img src={track.thumbnail_url} alt={track.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold truncate">{track.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="hover:bg-secondary"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="gradient-primary hover:opacity-90 shadow-glow w-12 h-12"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="hover:bg-secondary"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-lg">
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="hover:bg-secondary"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

import { Card } from "@/components/ui/card";
import { Music, Play, Pause } from "lucide-react";

interface MusicCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    thumbnail_url: string;
  };
  onClick: () => void;
  isPlaying: boolean;
}

const MusicCard = ({ track, onClick, isPlaying }: MusicCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer glass-effect border-border/50 hover:scale-105 transition-smooth hover:shadow-glow"
    >
      <div className="aspect-square relative overflow-hidden bg-secondary">
        {track.thumbnail_url ? (
          <img
            src={track.thumbnail_url}
            alt={track.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <div className="p-4 rounded-full bg-primary/90 shadow-glow">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white" />
            )}
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold truncate">{track.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>
    </Card>
  );
};

export default MusicCard;

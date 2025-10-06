import { Button } from "@/components/ui/button";
import { X, Heart } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  movie: {
    id: string;
    title: string;
    description: string;
    video_url: string;
  };
  onClose: () => void;
}

const VideoPlayer = ({ movie, onClose }: VideoPlayerProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          {movie.description && (
            <p className="text-muted-foreground mt-1">{movie.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="hover:bg-white/10"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <video
          src={movie.video_url}
          controls
          autoPlay
          className="w-full h-full"
          controlsList="nodownload"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

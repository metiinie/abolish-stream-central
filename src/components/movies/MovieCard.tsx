import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    thumbnail_url: string;
  };
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer glass-effect border-border/50 hover:scale-105 transition-smooth hover:shadow-glow"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-secondary">
        {movie.thumbnail_url ? (
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <div className="p-4 rounded-full bg-primary/90 shadow-glow">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold truncate">{movie.title}</h3>
      </div>
    </Card>
  );
};

export default MovieCard;

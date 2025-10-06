import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MusicCard from "@/components/music/MusicCard";
import AudioPlayer from "@/components/music/AudioPlayer";
import { Skeleton } from "@/components/ui/skeleton";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  description: string;
  thumbnail_url: string;
  audio_url: string;
}

const Music = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
    fetchMusic();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();
      setIsAdmin(!!data);
    }
  };

  const fetchMusic = async () => {
    try {
      const { data, error } = await supabase
        .from("music")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTracks(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching music",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="gradient-secondary min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/choice")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                Music
              </h1>
            </div>
            {isAdmin && (
              <Button
                onClick={() => navigate("/upload")}
                className="gradient-primary hover:opacity-90 transition-smooth shadow-glow"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            )}
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tracks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : filteredTracks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTracks.map((track) => (
                <MusicCard
                  key={track.id}
                  track={track}
                  onClick={() => setCurrentTrack(track)}
                  isPlaying={currentTrack?.id === track.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No music found</p>
            </div>
          )}
        </div>
      </div>

      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          tracks={filteredTracks}
          onTrackChange={setCurrentTrack}
          onClose={() => setCurrentTrack(null)}
        />
      )}
    </div>
  );
};

export default Music;

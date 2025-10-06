import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload as UploadIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail_url: "",
    video_url: "",
  });

  const [musicData, setMusicData] = useState({
    title: "",
    artist: "",
    album: "",
    description: "",
    thumbnail_url: "",
    audio_url: "",
  });

  const handleMovieSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("movies").insert([movieData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Movie uploaded successfully",
      });

      setMovieData({
        title: "",
        description: "",
        category: "",
        thumbnail_url: "",
        video_url: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMusicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("music").insert([musicData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Music uploaded successfully",
      });

      setMusicData({
        title: "",
        artist: "",
        album: "",
        description: "",
        thumbnail_url: "",
        audio_url: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-secondary min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Upload Content
            </h1>
          </div>

          <Tabs defaultValue="movie" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="movie">Movie</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
            </TabsList>

            <TabsContent value="movie">
              <Card className="glass-effect border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle>Upload Movie</CardTitle>
                  <CardDescription>Add a new movie to the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMovieSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="movie-title">Title *</Label>
                      <Input
                        id="movie-title"
                        value={movieData.title}
                        onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
                        required
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movie-description">Description</Label>
                      <Textarea
                        id="movie-description"
                        value={movieData.description}
                        onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
                        className="bg-secondary border-border min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movie-category">Category</Label>
                      <Input
                        id="movie-category"
                        value={movieData.category}
                        onChange={(e) => setMovieData({ ...movieData, category: e.target.value })}
                        placeholder="e.g., Action, Drama, Comedy"
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movie-thumbnail">Thumbnail URL</Label>
                      <Input
                        id="movie-thumbnail"
                        type="url"
                        value={movieData.thumbnail_url}
                        onChange={(e) => setMovieData({ ...movieData, thumbnail_url: e.target.value })}
                        placeholder="https://example.com/thumbnail.jpg"
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movie-video">Video URL *</Label>
                      <Input
                        id="movie-video"
                        type="url"
                        value={movieData.video_url}
                        onChange={(e) => setMovieData({ ...movieData, video_url: e.target.value })}
                        required
                        placeholder="https://example.com/video.mp4"
                        className="bg-secondary border-border"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-glow"
                      disabled={loading}
                    >
                      <UploadIcon className="w-4 h-4 mr-2" />
                      {loading ? "Uploading..." : "Upload Movie"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="music">
              <Card className="glass-effect border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle>Upload Music</CardTitle>
                  <CardDescription>Add a new track to the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMusicSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="music-title">Title *</Label>
                      <Input
                        id="music-title"
                        value={musicData.title}
                        onChange={(e) => setMusicData({ ...musicData, title: e.target.value })}
                        required
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="music-artist">Artist</Label>
                      <Input
                        id="music-artist"
                        value={musicData.artist}
                        onChange={(e) => setMusicData({ ...musicData, artist: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="music-album">Album</Label>
                      <Input
                        id="music-album"
                        value={musicData.album}
                        onChange={(e) => setMusicData({ ...musicData, album: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="music-description">Description</Label>
                      <Textarea
                        id="music-description"
                        value={musicData.description}
                        onChange={(e) => setMusicData({ ...musicData, description: e.target.value })}
                        className="bg-secondary border-border min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="music-thumbnail">Thumbnail URL</Label>
                      <Input
                        id="music-thumbnail"
                        type="url"
                        value={musicData.thumbnail_url}
                        onChange={(e) => setMusicData({ ...musicData, thumbnail_url: e.target.value })}
                        placeholder="https://example.com/cover.jpg"
                        className="bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="music-audio">Audio URL *</Label>
                      <Input
                        id="music-audio"
                        type="url"
                        value={musicData.audio_url}
                        onChange={(e) => setMusicData({ ...musicData, audio_url: e.target.value })}
                        required
                        placeholder="https://example.com/audio.mp3"
                        className="bg-secondary border-border"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-glow"
                      disabled={loading}
                    >
                      <UploadIcon className="w-4 h-4 mr-2" />
                      {loading ? "Uploading..." : "Upload Music"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Upload;

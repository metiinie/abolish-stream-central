import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Music, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Choice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-secondary opacity-50" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            What would you like to watch?
          </h1>
          <p className="text-muted-foreground text-lg">Choose your entertainment experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card
            className="glass-effect shadow-card border-border/50 cursor-pointer group hover:scale-105 transition-smooth hover:shadow-glow"
            onClick={() => navigate("/movies")}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-6 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-smooth">
                  <Film className="w-16 h-16 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl">Movies</CardTitle>
              <CardDescription className="text-base">
                Explore a vast collection of movies from all genres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-glow">
                Browse Movies
              </Button>
            </CardContent>
          </Card>

          <Card
            className="glass-effect shadow-card border-border/50 cursor-pointer group hover:scale-105 transition-smooth hover:shadow-glow"
            onClick={() => navigate("/music")}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-6 rounded-full bg-primary-glow/20 group-hover:bg-primary-glow/30 transition-smooth">
                  <Music className="w-16 h-16 text-primary-glow" />
                </div>
              </div>
              <CardTitle className="text-3xl">Music</CardTitle>
              <CardDescription className="text-base">
                Listen to your favorite tracks and discover new artists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-glow">
                Browse Music
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Choice;

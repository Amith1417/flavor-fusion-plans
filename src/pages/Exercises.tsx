import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exercises, exerciseCategories, type Exercise } from "@/data/exerciseData";
import { Play, Clock, BarChart3, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ExerciseCard({ exercise, onPlay }: { exercise: Exercise; onPlay: () => void }) {
  return (
    <motion.div
      className="soft-card overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="relative aspect-video bg-secondary cursor-pointer group" onClick={onPlay}>
        <img
          src={`https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg`}
          alt={exercise.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
        <Badge className="absolute top-2 left-2 bg-black/60 text-white border-0 text-[10px]">
          {exercise.emoji} {exercise.category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-display font-extrabold text-sm mb-1">{exercise.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{exercise.description}</p>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" /> {exercise.duration}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <BarChart3 className="h-3 w-3" /> {exercise.difficulty}
          </span>
        </div>
        {exercise.targetConditions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {exercise.targetConditions.map((c) => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Exercises() {
  const [category, setCategory] = useState("All");
  const [conditionFilter, setConditionFilter] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<Exercise | null>(null);
  const [userConditions, setUserConditions] = useState<string[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("userProfile");
    if (stored) {
      const profile = JSON.parse(stored);
      setUserConditions(profile.diseases || []);
    }
  }, []);

  const filtered = exercises.filter((e) => {
    if (category !== "All" && e.category !== category) return false;
    if (conditionFilter && !e.targetConditions.includes(conditionFilter)) return false;
    return true;
  });

  const recommendedForUser = userConditions.length > 0
    ? exercises.filter((e) => e.targetConditions.some((c) => userConditions.includes(c)))
    : [];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold mb-1">
          Exercise Videos 🏋️
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Workouts tailored to your health conditions
        </p>

        {/* Recommended section */}
        {recommendedForUser.length > 0 && !conditionFilter && category === "All" && (
          <div className="mb-8">
            <h2 className="font-display font-extrabold text-base mb-3 flex items-center gap-2">
              ⭐ Recommended for You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedForUser.slice(0, 3).map((ex) => (
                <ExerciseCard key={ex.id} exercise={ex} onPlay={() => setPlayingVideo(ex)} />
              ))}
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {exerciseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Condition filter */}
        {userConditions.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {userConditions.map((c) => (
              <button
                key={c}
                onClick={() => setConditionFilter(conditionFilter === c ? null : c)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border ${
                  conditionFilter === c
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
            {conditionFilter && (
              <button onClick={() => setConditionFilter(null)} className="text-xs text-primary font-bold flex items-center gap-1">
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} onPlay={() => setPlayingVideo(ex)} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No exercises found for this filter</p>
          </div>
        )}
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              className="bg-card rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={playingVideo.name}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-extrabold">{playingVideo.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{playingVideo.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setPlayingVideo(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

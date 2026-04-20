import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Check, X, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { dietPlansInfo, type DietPlanInfo } from "@/data/dietPlansInfo";
import { diseases } from "@/data/mockData";

function DietCard({ diet, onView, onChoose }: { diet: DietPlanInfo; onView: () => void; onChoose: () => void }) {
  return (
    <motion.div
      className="soft-card-hover p-5 flex flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{diet.icon}</div>
        <Badge
          variant="outline"
          className={`text-[10px] font-bold ${
            diet.difficulty === "Easy"
              ? "border-green-500/40 text-green-600"
              : diet.difficulty === "Moderate"
              ? "border-amber-500/40 text-amber-600"
              : "border-red-500/40 text-red-600"
          }`}
        >
          {diet.difficulty}
        </Badge>
      </div>
      <h3 className="font-display font-extrabold text-lg mb-1">{diet.name}</h3>
      <p className="text-xs text-muted-foreground mb-3">{diet.tagline}</p>

      {diet.goodFor.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {diet.goodFor.slice(0, 3).map((g) => (
            <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
              ✓ {g}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 my-3 text-center">
        <div>
          <div className="text-xs font-display font-extrabold text-foreground">{diet.macros.protein}%</div>
          <div className="text-[9px] text-muted-foreground font-bold">PROTEIN</div>
        </div>
        <div>
          <div className="text-xs font-display font-extrabold text-foreground">{diet.macros.carbs}%</div>
          <div className="text-[9px] text-muted-foreground font-bold">CARBS</div>
        </div>
        <div>
          <div className="text-xs font-display font-extrabold text-foreground">{diet.macros.fat}%</div>
          <div className="text-[9px] text-muted-foreground font-bold">FAT</div>
        </div>
      </div>

      <div className="mt-auto flex gap-2 pt-3">
        <Button variant="outline" size="sm" onClick={onView} className="flex-1 rounded-xl text-xs font-bold">
          Details
        </Button>
        <Button size="sm" onClick={onChoose} className="flex-1 coral-btn text-xs">
          Choose
        </Button>
      </div>
    </motion.div>
  );
}

export default function Diets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCondition, setFilterCondition] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<DietPlanInfo | null>(null);

  const filtered = useMemo(() => {
    return dietPlansInfo.filter((d) => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.tagline.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCondition && !d.goodFor.includes(filterCondition)) return false;
      return true;
    });
  }, [search, filterCondition]);

  const choose = (name: string) => {
    navigate(`/planner?diet=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold mb-1">
          Diet Plans Library 🍽️
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Browse {dietPlansInfo.length} science-backed eating styles. Pick one tailored to your conditions.
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search diets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border rounded-xl h-11"
          />
        </div>

        {/* Condition filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-xs font-bold text-muted-foreground">Filter by condition:</span>
          {diseases.slice(0, 6).map((d) => (
            <button
              key={d}
              onClick={() => setFilterCondition(filterCondition === d ? null : d)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border ${
                filterCondition === d
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {d}
            </button>
          ))}
          {filterCondition && (
            <button onClick={() => setFilterCondition(null)} className="text-xs text-primary font-bold flex items-center gap-1">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((d) => (
              <DietCard key={d.name} diet={d} onView={() => setSelectedDiet(d)} onChoose={() => choose(d.name)} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No diets match your filters</p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDiet && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDiet(null)}
          >
            <motion.div
              className="bg-card rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gradient-mint p-6 relative">
                <button
                  onClick={() => setSelectedDiet(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-primary-foreground hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="text-5xl mb-2">{selectedDiet.icon}</div>
                <h2 className="text-2xl font-display font-extrabold text-primary-foreground">{selectedDiet.name}</h2>
                <p className="text-sm text-primary-foreground/90">{selectedDiet.tagline}</p>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedDiet.description}</p>

                <div>
                  <h4 className="font-display font-extrabold text-sm mb-2">✨ Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDiet.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs">
                        <Check className="h-3 w-3 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDiet.goodFor.length > 0 && (
                  <div>
                    <h4 className="font-display font-extrabold text-sm mb-2">✅ Good for</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDiet.goodFor.map((g) => (
                        <span key={g} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDiet.avoidIf.length > 0 && (
                  <div>
                    <h4 className="font-display font-extrabold text-sm mb-2">⚠️ Caution if you have</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDiet.avoidIf.map((a) => (
                        <span key={a} className="text-[11px] px-2.5 py-1 rounded-full bg-warning/10 text-warning font-bold">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-display font-extrabold text-sm mb-2">🍽️ Sample Day</h4>
                  <div className="space-y-2">
                    {selectedDiet.sampleDay.map((s) => (
                      <div key={s.meal} className="flex items-start gap-3 p-3 bg-secondary/40 rounded-xl">
                        <span className="text-[10px] font-extrabold text-primary uppercase w-16 flex-shrink-0 mt-0.5">{s.meal}</span>
                        <span className="text-xs text-foreground">{s.food}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => choose(selectedDiet.name)} className="w-full coral-btn h-12 text-base shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Choose this diet
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

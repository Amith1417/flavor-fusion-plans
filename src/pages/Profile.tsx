import { motion } from "framer-motion";
import { User, Mail, Activity, Target, Scale, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import { type UserProfile } from "@/data/mockData";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-8">
          Your <span className="gradient-text">Profile</span>
        </h1>

        <div className="glass-card p-8 mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">SmartPlate User</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" /> user@smartplate.ai
              </p>
            </div>
          </div>

          {profile ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Age", value: `${profile.age} years`, icon: Activity },
                { label: "Weight", value: `${profile.weight} kg`, icon: Scale },
                { label: "Height", value: `${profile.height} cm`, icon: Ruler },
                { label: "Diet Preference", value: profile.preference, icon: Target },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <p className="font-display font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {profile.diseases.length > 0 && (
                <div className="sm:col-span-2 glass-card p-4">
                  <span className="text-xs text-muted-foreground">Health Conditions</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.diseases.map((d) => (
                      <span key={d} className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Complete the diet planner to see your profile data here.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

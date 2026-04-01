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
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-extrabold mb-8">
          Your Profile 👤
        </h1>

        <div className="soft-card p-8 mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl gradient-mint flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl">{profile?.name || "SmartPlate User"}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 font-medium">
                <Mail className="h-3 w-3" /> user@smartplate.ai
              </p>
            </div>
          </div>

          {profile ? (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Age", value: `${profile.age} years`, icon: Activity },
                { label: "Weight", value: `${profile.weight} kg`, icon: Scale },
                { label: "Height", value: `${profile.height} cm`, icon: Ruler },
                { label: "Diet", value: profile.preference, icon: Target },
              ].map((item) => (
                <div key={item.label} className="soft-card p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
                    <p className="font-display font-bold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {profile.diseases.length > 0 && (
                <div className="col-span-2 soft-card p-4">
                  <span className="text-[10px] text-muted-foreground font-medium">Health Conditions</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.diseases.map((d) => (
                      <span key={d} className="mint-badge">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm font-medium">
              Complete the diet planner to see your profile data here.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

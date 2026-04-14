import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, FileText, BarChart3, Settings, TrendingUp, Activity,
  ChevronRight, Search, MoreVertical, Eye, Trash2, Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Tab = "overview" | "users" | "content" | "settings";

const mockUsers = [
  { id: 1, name: "Aisha Patel", email: "aisha@mail.com", plan: "Keto", streak: 12, status: "active" },
  { id: 2, name: "Raj Kumar", email: "raj@mail.com", plan: "Jain", streak: 8, status: "active" },
  { id: 3, name: "Maria Lopez", email: "maria@mail.com", plan: "Mediterranean", streak: 3, status: "inactive" },
  { id: 4, name: "John Doe", email: "john@mail.com", plan: "Paleo", streak: 21, status: "active" },
  { id: 5, name: "Priya Singh", email: "priya@mail.com", plan: "DASH", streak: 5, status: "active" },
  { id: 6, name: "Chen Wei", email: "chen@mail.com", plan: "Whole30", streak: 15, status: "active" },
];

const stats = [
  { label: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Active Plans", value: "892", change: "+8%", icon: FileText, color: "text-emerald-500" },
  { label: "Avg Streak", value: "7.3 days", change: "+15%", icon: TrendingUp, color: "text-orange-500" },
  { label: "Engagement", value: "78%", change: "+5%", icon: Activity, color: "text-blue-500" },
];

const dietPlanStats = [
  { name: "Keto", users: 280, pct: 31 },
  { name: "Vegetarian", users: 220, pct: 25 },
  { name: "Mediterranean", users: 150, pct: 17 },
  { name: "Paleo", users: 95, pct: 11 },
  { name: "Vegan", users: 78, pct: 9 },
  { name: "Others", users: 69, pct: 7 },
];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("overview");
  const [userSearch, setUserSearch] = useState("");

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "content", label: "Content", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredUsers = mockUsers.filter(
    (u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold mb-1">
          Admin Dashboard 🛠️
        </h1>
        <p className="text-muted-foreground text-sm mb-6">Manage users, content, and analytics</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary rounded-2xl p-1 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                tab === t.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="soft-card p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                    <Badge variant="secondary" className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {s.change}
                    </Badge>
                  </div>
                  <p className="text-xl font-display font-extrabold">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Diet plan distribution */}
            <div className="soft-card p-6">
              <h3 className="font-display font-extrabold text-sm mb-4">Diet Plan Distribution</h3>
              <div className="space-y-3">
                {dietPlanStats.map((d) => (
                  <div key={d.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{d.name}</span>
                      <span className="text-muted-foreground">{d.users} users ({d.pct}%)</span>
                    </div>
                    <Progress value={d.pct} className="h-2 bg-secondary" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="soft-card p-6">
              <h3 className="font-display font-extrabold text-sm mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { text: "Aisha Patel generated a new Keto meal plan", time: "2 min ago" },
                  { text: "Raj Kumar reached a 7-day streak", time: "15 min ago" },
                  { text: "New user Maria Lopez signed up", time: "1 hour ago" },
                  { text: "John Doe downloaded his weekly report", time: "3 hours ago" },
                  { text: "Chen Wei completed 10,000 steps", time: "5 hours ago" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground flex-1">{a.text}</span>
                    <span className="text-muted-foreground whitespace-nowrap">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border rounded-xl h-10"
                />
              </div>
              <Button variant="outline" className="rounded-xl h-10 text-xs font-bold">
                Export CSV
              </Button>
            </div>

            <div className="soft-card overflow-hidden">
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-bold text-muted-foreground">User</th>
                      <th className="text-left p-3 font-bold text-muted-foreground">Plan</th>
                      <th className="text-left p-3 font-bold text-muted-foreground">Streak</th>
                      <th className="text-left p-3 font-bold text-muted-foreground">Status</th>
                      <th className="text-right p-3 font-bold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-3">
                          <div>
                            <p className="font-bold text-foreground">{u.name}</p>
                            <p className="text-muted-foreground">{u.email}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-[10px] font-bold">{u.plan}</Badge>
                        </td>
                        <td className="p-3 font-bold">🔥 {u.streak} days</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                            u.status === "active" ? "text-emerald-600" : "text-muted-foreground"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              u.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"
                            }`} />
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 hover:bg-secondary rounded-lg"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
                            <button className="p-1.5 hover:bg-secondary rounded-lg"><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                            <button className="p-1.5 hover:bg-secondary rounded-lg"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-border">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.plan} · 🔥 {u.streak}d</p>
                    </div>
                    <span className={`h-2 w-2 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {tab === "content" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Diet Plans", count: 9, desc: "Active diet plan templates", emoji: "🍽️" },
                { title: "Exercises", count: 12, desc: "Exercise videos in library", emoji: "🏋️" },
                { title: "Risk Alerts", count: 18, desc: "Disease-food warnings", emoji: "⚠️" },
                { title: "Chatbot Responses", count: 8, desc: "AI response templates", emoji: "🤖" },
                { title: "Meal Items", count: 36, desc: "Individual meal entries", emoji: "🥗" },
                { title: "Health Conditions", count: 11, desc: "Supported conditions", emoji: "🩺" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="soft-card p-5 cursor-pointer hover:border-primary/20 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <Badge variant="secondary" className="text-[10px] font-bold">{item.count}</Badge>
                  </div>
                  <h3 className="font-display font-extrabold text-sm">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  <Button variant="ghost" size="sm" className="mt-3 text-xs text-primary font-bold p-0 h-auto">
                    Manage <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <div className="space-y-4 max-w-lg">
            {[
              { title: "App Name", value: "SmartPlate AI", type: "text" },
              { title: "Default Calorie Goal", value: "2000", type: "number" },
              { title: "Default Step Goal", value: "8000", type: "number" },
              { title: "Max Risk Alert Severity", value: "high", type: "select" },
            ].map((setting) => (
              <div key={setting.title} className="soft-card p-4">
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">{setting.title}</label>
                <Input defaultValue={setting.value} className="bg-secondary/50 border-border rounded-xl h-10 text-sm" />
              </div>
            ))}
            <Button className="coral-btn h-11 px-6 text-sm font-bold shadow-lg">
              Save Settings
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

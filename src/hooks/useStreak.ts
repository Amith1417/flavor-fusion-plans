import { useState, useEffect } from "react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null;
  history: string[]; // ISO date strings
}

const STORAGE_KEY = "smartplate_streak";

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayISO() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastCheckIn: null, history: [] };
}

function saveStreak(data: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  useEffect(() => {
    // Auto check-in when user visits the app
    const today = getTodayISO();
    if (streak.lastCheckIn === today) return;

    const yesterday = getYesterdayISO();
    const wasYesterday = streak.lastCheckIn === yesterday;

    const newStreak: StreakData = {
      ...streak,
      lastCheckIn: today,
      history: [...streak.history.slice(-29), today],
      currentStreak: wasYesterday ? streak.currentStreak + 1 : 1,
      longestStreak: 0,
    };
    newStreak.longestStreak = Math.max(newStreak.currentStreak, streak.longestStreak);

    setStreak(newStreak);
    saveStreak(newStreak);
  }, []);

  const checkedInToday = streak.lastCheckIn === getTodayISO();

  // Get last 7 days activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().split("T")[0];
    return { date: iso, day: d.toLocaleDateString("en", { weekday: "short" }), active: streak.history.includes(iso) };
  });

  return { ...streak, checkedInToday, last7Days };
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

export type UserRole = "admin" | "mentor" | "talent" | "brand";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar: string; // gradient classes
  title?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  gallery?: { type: "photo" | "video"; url: string; caption: string }[];
  socials?: { platform: string; url: string }[];
  curated?: boolean;
  verified?: boolean;
  onboardingComplete?: boolean;
  // Brand-specific
  companyName?: string;
  industry?: string;
  website?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    location?: string;
    companyName?: string;
  }) => Promise<UserProfile>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

/* ══════════════════════════════════════════════
   Constants
   ══════════════════════════════════════════════ */

const AUTH_STORAGE_KEY = "asr_user";

// Emails de test pour chaque rôle
const ADMIN_EMAIL = "admin@africashowbizroom.com";
const MENTOR_EMAIL = "mentor@africashowbizroom.com";
const BRAND_EMAIL = "brand@africashowbizroom.com";

/* ══════════════════════════════════════════════
   Context
   ══════════════════════════════════════════════ */

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/* ══════════════════════════════════════════════
   Provider
   ══════════════════════════════════════════════ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ── Hydrate from storage ── */
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(AUTH_STORAGE_KEY) ??
        sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ── Persist helper ── */
  const persist = useCallback((profile: UserProfile | null) => {
    if (profile) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setUser(profile);
  }, []);

  /* ── Login ── */
  const login = useCallback(
    async (email: string, _password: string): Promise<UserProfile> => {
      // Simulation d'appel API
      await new Promise((r) => setTimeout(r, 1200));

      const normalizedEmail = email.toLowerCase().trim();
      const isAdmin = normalizedEmail === ADMIN_EMAIL;
      const isMentor = normalizedEmail === MENTOR_EMAIL;
      const isBrand = normalizedEmail === BRAND_EMAIL;

      let profile: UserProfile;

      if (isAdmin) {
        profile = {
          id: "admin-1",
          email: ADMIN_EMAIL,
          fullName: "Admin ASR",
          role: "admin",
          avatar: "from-red-500 to-rose-600",
          title: "Administrateur",
          location: "Dakar, Sénégal",
          curated: false,
          verified: true,
          onboardingComplete: true,
        };
      } else if (isMentor) {
        profile = {
          id: "mentor-1",
          email: MENTOR_EMAIL,
          fullName: "Aminata Diallo",
          role: "mentor",
          avatar: "from-purple-500 to-violet-400",
          title: "Directrice Artistique & Consultante",
          bio: "15 ans d'expérience dans l'industrie musicale africaine. J'ai accompagné plus de 50 artistes dans leur développement de carrière.",
          location: "Abidjan, Côte d'Ivoire",
          skills: ["Direction artistique", "Management", "Consulting", "Marketing"],
          curated: true,
          verified: true,
          onboardingComplete: true,
        };
      } else if (isBrand) {
        profile = {
          id: "brand-1",
          email: BRAND_EMAIL,
          fullName: "AfriBeats Label",
          role: "brand",
          avatar: "from-emerald-500 to-teal-500",
          title: "Label musical panafricain",
          bio: "Leader de la production musicale en Afrique de l'Ouest. Nous cherchons les meilleurs talents pour nos projets.",
          location: "Lagos, Nigeria",
          companyName: "AfriBeats Label",
          industry: "Musique & Divertissement",
          website: "https://afribeats.com",
          curated: true,
          verified: true,
          onboardingComplete: true,
        };
      } else {
        // Talent par défaut
        profile = {
          id: `user-${Date.now()}`,
          email: normalizedEmail,
          fullName: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          role: "talent",
          avatar: "from-amber-400 to-orange-500",
          onboardingComplete: false,
        };
      }

      persist(profile);
      return profile;
    },
    [persist]
  );

  /* ── Register ── */
  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      fullName: string;
      role: UserRole;
      location?: string;
      companyName?: string;
    }): Promise<UserProfile> => {
      await new Promise((r) => setTimeout(r, 1000));

      const avatarByRole: Record<UserRole, string> = {
        talent: "from-amber-400 to-orange-500",
        mentor: "from-purple-500 to-violet-400",
        brand: "from-emerald-500 to-teal-500",
        admin: "from-red-500 to-rose-600",
      };

      const profile: UserProfile = {
        id: `user-${Date.now()}`,
        email: data.email.toLowerCase().trim(),
        fullName: data.fullName,
        role: data.role,
        avatar: avatarByRole[data.role],
        location: data.location,
        companyName: data.companyName,
        onboardingComplete: false,
      };

      persist(profile);
      return profile;
    },
    [persist]
  );

  /* ── Logout ── */
  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  /* ── Update profile ── */
  const updateProfile = useCallback(
    (data: Partial<UserProfile>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...data };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

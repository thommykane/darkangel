"use client";

import { useEffect, useState } from "react";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  mustChangePassword: boolean;
}

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return { user, loaded, setUser };
}

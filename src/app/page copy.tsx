'use client';

import { useSession } from "next-auth/react";
import { openAuthPopup } from "@/lib/auth-popup";
import { signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  const handleLogin = async (provider: "google" | "facebook") => {
    try {
      await openAuthPopup(provider);
      window.location.reload(); // refresh để cập nhật session
    } catch (e) {
      console.warn("User cancelled login.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button onClick={() => handleLogin("google")}>Login with Google</button>
          <button onClick={() => handleLogin("facebook")}>Login with Facebook</button>
        </>
      )}
    </main>
  );
}
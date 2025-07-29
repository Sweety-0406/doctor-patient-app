
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Doctor = {
  id: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
};

type AuthContextType = {
  doctor: Doctor | null;
  login: (doctor: Doctor) => void;
  logout: () => void;
  loading: boolean; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DoctorAuthProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Initialize loading

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor");
    if (storedDoctor) {
      try {
        const parsed = JSON.parse(storedDoctor);
        setDoctor(parsed);
        console.log("Doctor loaded from localStorage:", parsed);
      } catch (error) {
        console.error("Failed to parse doctor from localStorage:", error);
      }
    }
    setLoading(false); // ✅ Done loading after checking localStorage
  }, []);

  const login = (doctor: Doctor) => {
    setDoctor(doctor);
    try {
      localStorage.setItem("doctor", JSON.stringify(doctor));
      console.log("Doctor saved to localStorage:", doctor);
    } catch (error) {
      console.error("Failed to save doctor to localStorage:", error);
    }
  };

  const logout = () => {
    setDoctor(null);
    localStorage.removeItem("doctor");
  };

  return (
    <AuthContext.Provider value={{ doctor, login, logout, loading }}>
      {!loading && children} {/* ✅ Only render children after loading */}
    </AuthContext.Provider>
  );
};

export const useDoctorAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useDoctorAuth must be used inside a DoctorAuthProvider");
  }
  return context;
};

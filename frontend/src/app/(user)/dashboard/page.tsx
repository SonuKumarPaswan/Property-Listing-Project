"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // check auth + fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Checking auth with token:", token);
    if (!token) {
      router.push("/sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log("Auth failed:", error);
        localStorage.removeItem("token");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  //  logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <h2>Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

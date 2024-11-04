import axios from "axios";

export async function login(credentials) {
  const res = await axios.post("/api/v1/auth/login", credentials, {
    withCredentials: true,
  });

  return res.data.data.user;
}

export async function getCurrentUser() {
  const res = await axios.get("/api/v1/auth/validate", {
    withCredentials: true,
  });

  return res.data.data.user;
}

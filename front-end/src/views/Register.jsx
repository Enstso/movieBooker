import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <input type="email" className="w-full p-2 mb-4 border" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 mb-4 border" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-green-500 text-white py-2">Register</button>
      </form>
    </div>
  );
}

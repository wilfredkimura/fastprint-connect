import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";

export default function Register() {
  const { register: doRegister } = useAuth();
  const nav = useNavigate();
  const { items } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await doRegister(name, email, password);
      nav("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header cartItemCount={items.length} />
      <div className="container max-w-md py-12">
      <h1 className="text-2xl font-heading font-bold mb-6">Register</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? "Creating account..." : "Register"}</Button>
      </form>
      <p className="text-sm mt-4">
        Already have an account? <Link className="text-primary" to="/login">Login</Link>
      </p>
      </div>
    </>
  );
}

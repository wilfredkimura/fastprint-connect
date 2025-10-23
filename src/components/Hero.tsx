import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Shirt, Frame } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Removed gradient background overlay */}
      
      <div className="container relative py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              FASTPRINT
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into reality with our premium custom printing services.
              From branded merchandise to personalized gifts, we bring your vision to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button size="lg" className="gap-2 shadow-elegant">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Custom Quote
              </Button>
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
};

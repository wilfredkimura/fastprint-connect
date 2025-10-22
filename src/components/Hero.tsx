import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Shirt, Frame } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10 dark:opacity-20" />
      
      <div className="container relative py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Custom Printing,{" "}
              <span className="gradient-hero bg-clip-text text-transparent">
                Endless Possibilities
              </span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-16">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-card">
              <Frame className="h-12 w-12 text-primary" />
              <h3 className="font-heading font-semibold text-lg">Custom Frames</h3>
              <p className="text-sm text-muted-foreground text-center">
                Beautiful decor frames for any occasion
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-card">
              <Shirt className="h-12 w-12 text-secondary" />
              <h3 className="font-heading font-semibold text-lg">Branded Apparel</h3>
              <p className="text-sm text-muted-foreground text-center">
                Custom clothing with your unique designs
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-card">
              <Palette className="h-12 w-12 text-accent" />
              <h3 className="font-heading font-semibold text-lg">Personalized Gifts</h3>
              <p className="text-sm text-muted-foreground text-center">
                Mugs, tumblers, and more with your touch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

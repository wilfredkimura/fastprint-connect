import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = mockProducts.filter(p => p.isFeatured);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our most popular custom printing solutions
              </p>
            </div>
            <Link to="/products" className="hidden md:block">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link to="/products">
              <Button className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Create Something Unique?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for custom quotes on bulk orders, corporate branding, or special projects.
            We're here to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/254721248369" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                WhatsApp Us
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

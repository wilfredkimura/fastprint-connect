import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              About{" "}
              <span className="gradient-hero bg-clip-text text-transparent">
                FASTPRINTKE
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted partner for custom printing and branded merchandise in Kenya
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  FASTPRINTKE is a premier custom printing service based in Nairobi, Kenya. We specialize
                  in transforming your creative ideas into tangible, high-quality products. From personalized
                  gifts to corporate branding solutions, we bring your vision to life with precision and care.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment to quality, fast turnaround times, and exceptional customer service has made
                  us a trusted name in the industry. Whether you need custom frames, branded apparel, personalized
                  mugs, or Christian-inspired designs, we have the expertise and passion to deliver excellence.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Heart className="h-12 w-12 mx-auto text-primary" />
                <h3 className="font-heading font-semibold text-lg">Faith & Creativity</h3>
                <p className="text-sm text-muted-foreground">
                  We blend faith-inspired designs with creative excellence
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Award className="h-12 w-12 mx-auto text-secondary" />
                <h3 className="font-heading font-semibold text-lg">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  Premium materials and attention to detail in every product
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Users className="h-12 w-12 mx-auto text-accent" />
                <h3 className="font-heading font-semibold text-lg">Customer Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority, every step of the way
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-heading font-bold">Visit Us</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">
                      Tumaini House, Moi Avenue<br />
                      4th Floor, Room 411<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+254721248369" className="text-muted-foreground hover:text-primary transition-colors">
                      0721 248 369
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@fastprintke.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@fastprintke.com
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Browse our products or contact us for custom quotes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg">Browse Products</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

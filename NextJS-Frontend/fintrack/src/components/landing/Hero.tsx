import { Button } from "@heroui/button";
import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
}

const Hero: React.FC<HeroProps> = ({ imageSrc = "/Illustration.svg" }) => {
  return (
    <section className="bg-background min-h-screen flex items-center dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl text-foreground font-bold sm:text-5xl lg:text-6xl leading-tight dark:text-white animate-slide-up">
                Take Control of Your <span className="text-primary">Finance</span> with{" "}
                <span className="text-secondary">Effortless</span> Expense Tracking
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-in-delay-1">
                Track, manage, and save smarter with real-time insights. Your journey to financial freedom starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                aria-label="Start tracking expenses for free"
              >
                Get Started Free
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 animate-fade-in-delay-1">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Free to start</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in-delay-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in-delay-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Secure & private</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10 animate-fade-in">
              <Image
                src={imageSrc}
                alt="Financial tracking illustration showing expense management and savings"
                width={600}
                height={600}
                className="w-full h-auto max-w-lg mx-auto scale-100 hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
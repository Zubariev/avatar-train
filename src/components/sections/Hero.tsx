
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section
      id="home"
      className={cn(
        "relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70 -z-10" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-70 -z-10" />
      
      <Container className="relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-6 animate-fade-in">
            Minimalist Design System
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Beautiful design through simplicity and <span className="relative">clarity
              <span className="absolute bottom-1 left-0 w-full h-[0.2em] bg-gray-200 -z-10"></span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl animate-fade-in animate-delay-100">
            Embrace the power of minimalist design with our carefully crafted
            components and thoughtful user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-200">
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-md transition-all hover:bg-gray-800 hover:scale-105 active:scale-100"
            >
              Explore Features
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 border border-gray-300 rounded-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-100"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 animate-fade-in animate-delay-300">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <div className="glass p-6 aspect-[16/9] bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 16L14 12L10 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-xl">Your Beautiful Design Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

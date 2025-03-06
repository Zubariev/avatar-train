
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface AboutProps {
  className?: string;
}

const About = ({ className }: AboutProps) => {
  return (
    <section
      id="about"
      className={cn("py-20 lg:py-28", className)}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-6">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simplicity is the ultimate sophistication
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe that good design removes the unnecessary so that the necessary can speak. Our approach is guided by the principle that less is more, focusing on clean lines, purposeful functionality, and thoughtful details.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              By embracing minimalism, we create experiences that are intuitive, accessible, and timeless, allowing users to focus on what truly matters without distraction or confusion.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-4xl font-bold mb-2">95%</h4>
                <p className="text-gray-600">Customer satisfaction from our minimalist approach</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold mb-2">40%</h4>
                <p className="text-gray-600">Faster user task completion with our intuitive designs</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-gray-400">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg border border-gray-200 shadow-lg p-6 w-48 animate-float">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Design Principles</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Clear hierarchy</li>
                  <li>• Purposeful space</li>
                  <li>• Meaningful contrast</li>
                  <li>• Thoughtful typography</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;

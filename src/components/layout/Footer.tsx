
import Container from "@/components/ui/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Minimalist</h3>
            <p className="text-gray-600 max-w-md">
              A beautiful, minimalist design inspired by the principles of
              simplicity, elegance, and functionality.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">info@minimalist.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Design Street, Creative City</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Minimalist. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

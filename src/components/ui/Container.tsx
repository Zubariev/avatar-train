
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div 
      id={id}
      className={cn(
        "w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;

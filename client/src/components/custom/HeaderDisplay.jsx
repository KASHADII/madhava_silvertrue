import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";

const imagesData = [
  {
    image: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=800",
    title: "Elegant Necklaces",
    subtitle: "Timeless sophistication for every occasion",
    cta: "Discover Collection"
  },
  {
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=800",
    title: "Classic Earrings",
    subtitle: "Refined elegance that speaks volumes",
    cta: "Explore Designs"
  },
  {
    image: "https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&w=800",
    title: "Statement Rings",
    subtitle: "Bold statements for the confident woman",
    cta: "View Collection"
  },
  {
    image: "https://images.pexels.com/photos/3641055/pexels-photo-3641055.jpeg?auto=compress&w=800",
    title: "Luxury Bracelets",
    subtitle: "Sophisticated charm for your wrist",
    cta: "Shop Now"
  },
];

const HeaderDisplay = () => {
  return (
    <div className="relative py-20">
      <Carousel className="mx-auto w-full max-w-7xl overflow-hidden">
        <CarouselContent>
          {imagesData.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div className="relative h-[70vh] overflow-hidden">
                <img
                  src={slide.image}
                  loading="lazy"
                  className="object-cover w-full h-full"
                  alt={`Luxury Jewelry ${idx + 1}`}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="ml-16 md:ml-24 max-w-md">
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <a 
                      href="/catalogue" 
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-white font-medium tracking-wide hover:bg-[#B8941F] transition-all duration-300"
                    >
                      {slide.cta}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 opacity-20">
                  <div className="w-16 h-16 border border-[#D4AF37] rounded-full"></div>
                </div>
                <div className="absolute bottom-8 right-16 opacity-20">
                  <div className="w-8 h-8 border border-[#D4AF37] rounded-full"></div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom navigation buttons */}
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
      </Carousel>
    </div>
  );
};

export default HeaderDisplay;
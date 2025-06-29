import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imagesData = [
  // Premium jewellery images (royalty-free)
  "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3641055/pexels-photo-3641055.jpeg?auto=compress&w=800",
];

const HeaderDisplay = () => {
  return (
    <div className="relative">
      <Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible">
        <CarouselContent>
          {imagesData.map((image, idx) => (
            <CarouselItem key={image}>
              <div className="relative">
                <img
                  src={image}
                  loading="lazy"
                  className="object-cover w-full h-[60vh] rounded-3xl border-4 border-[#D4AF37] shadow-xl"
                  alt={`Jewellery Banner ${idx + 1}`}
                />
                {/* Overlay text for hero effect */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-3xl">
                  <h2 className="text-4xl font-bold text-[#fff] drop-shadow-lg mb-2">Shine Bright</h2>
                  <p className="text-lg text-[#fff] mb-4">Explore our new arrivals in gold & silver</p>
                  <a href="#collections" className="px-6 py-2 bg-[#D4AF37] text-white rounded-full font-semibold shadow hover:bg-[#bfa133] transition">Shop Collection</a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeaderDisplay;
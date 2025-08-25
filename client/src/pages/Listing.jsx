import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Auto-slide every 3s
  useEffect(() => {
    if (listing?.imageUrls.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === listing.imageUrls.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [listing]);

  const goToSlide = (index) => setCurrentIndex(index);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? listing.imageUrls.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === listing.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="mt-16">
      {loading && (
       <div className="flex justify-center">
  <div className="relative w-full max-w-[1000px] h-[500px] overflow-hidden rounded-xl shadow-lg flex items-center justify-center bg-black">
    <img
      src={listing.imageUrls[currentIndex]}
      alt="slide"
      className="w-full h-full object-contain transition-all duration-700"
    />
  </div>
</div>

      )}

      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {listing && !loading && !error && (
        <div className="flex justify-center">
        <div className="relative w-[1000px] h-[500px] overflow-hidden rounded-xl shadow-lg">
            
          <div
            className="w-full h-full bg-center bg-cover transition-all duration-700"
            style={{
                backgroundImage: `url(${listing.imageUrls[currentIndex]})`,
            }}
            ></div>
        </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
          >
            ❮
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {listing.imageUrls.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-gray-400 hover:bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

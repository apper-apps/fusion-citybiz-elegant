import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BusinessCard from "@/components/molecules/BusinessCard";
import { getTopRatedBusinesses } from "@/services/api/businessService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const FeaturedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTopRatedBusinesses(8);
      setBusinesses(data);
    } catch (err) {
      setError("Failed to load featured businesses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBusinesses} />;
  if (businesses.length === 0) return <Empty message="No featured businesses found" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Featured Businesses
          </h2>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Discover the highest-rated businesses in your area
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {businesses.map((business, index) => (
            <BusinessCard key={business.Id} business={business} index={index} />
          ))}
        </div>

        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "!bg-primary-500",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {businesses.map((business, index) => (
              <SwiperSlide key={business.Id}>
                <BusinessCard business={business} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedBusinesses;
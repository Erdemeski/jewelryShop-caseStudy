import React from 'react'
import hero from '../assets/photos/ring-silver.png'
import { motion } from 'framer-motion'
import { Button, Spinner } from 'flowbite-react'
import { useState, useEffect, useRef } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'
import FooterBanner from '../components/FooterBanner'

const stats = [
  { id: 1, name: 'We have been working for you', value: '42', suffix: ' years', prefix: 'for' },
  { id: 2, name: 'Satisfaction rate from customers', value: '98.5', suffix: '%', prefix: '🌟' },
  { id: 3, name: 'We serve per month', value: '50', suffix: ' clients', prefix: '>' },
]

const useCounter = (end, duration = 2000, trigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, trigger]);

  return count;
};


export default function HomePage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = useSelector((state) => state.currency.currency);
  const productsSectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = '/api/product/getproducts?limit=6';
        const res = await fetch(url);
        if (!res.ok) {
          console.error('Failed to fetch products:', res.status, res.statusText);
          setProducts([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProducts(data.data?.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <>
      <div className="min-h-[70vh] sm:min-h-[91vh] bg-white dark:bg-[rgb(22,26,29)] flex flex-col items-center justify-center px-2 sm:px-6 py-12 sm:py-24">
        <div className="relative isolate px-6 lg:px-8 flex-1 ">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-0"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-[pulse_7s_ease-in-out_infinite]"
            />
          </div>
          <div
            aria-hidden="true"
            className="-z-20 absolute inset-x-20 top-0 transform-gpu overflow-hidden blur-3xl sm:-top-0 translate-y-[1000px] lg:translate-x-[250px] rotate-180"
          >
            <div
              style={{
                clipPath:
                  'polygon(90% 10%, 100% 20%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 1% 100%, 76.1% 97.7%, 85% 110%, 90% 125%, 95% 140%, 98% 155%, 100% 170%, 200% 200%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-y-[100px] bg-gradient-to-tr from-[#63ff97] to-[#668aff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-[pulse_6s_ease-in-out_infinite]"
            />
          </div>

          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-square flex items-center justify-center z-10 overflow-hidden">
            <motion.img
              src={hero}
              alt="hero"
              className="w-full h-full object-contain sm:scale-150 scale-100"
              initial={{ opacity: 0, scale: 0, rotate: -50 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center flex-col mt-32"
              initial={{ opacity: 0, scale: 0, y: -200 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 text-center px-2 mt-0 md:mt-10">
                Welcome to <br />
                <span className='ml-2 font-semibold flex items-center justify-center'>
                  Jewelry
                  <span className='bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text'>Store</span>
                </span>

              </h1>
              <p className="mt-0 md:mt-3 mb-0 sm:mb-10 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-montserrat font-light text-center">
                We work to be with you <br /> in your most precious memories 💖
              </p>
              <div className="flex items-center justify-center mt-2">
                <Button color="dark" size='sm' outline className='font-montserrat' onClick={scrollToProducts}>
                  Go to rings!
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="pt-2 pb-16 sm:pb-20 sm:pt-2 relative z-10" ref={productsSectionRef}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.dl
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-x-8 gap-y-12 text-center lg:grid-cols-3"
            >
              {stats.map((stat, index) => {
                const [isVisible, setIsVisible] = useState(false);
                const count = useCounter(parseFloat(stat.value), 2000, isVisible);

                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onViewportEnter={() => setIsVisible(true)}
                    className="mx-auto flex max-w-xs flex-col gap-y-2 z-10"
                  >
                    <motion.dt
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="font-montserrat text-lg text-gray-500 dark:text-gray-400"
                    >
                      {stat.name}
                    </motion.dt>
                    <motion.dd
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="font-montserrat order-first text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl flex flex-row items-center justify-center gap-2"
                    >
                      {stat.prefix && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="font-montserrat text-3xl font-extralight text-gray-500 dark:text-gray-400 mt-1"
                        >
                          {stat.prefix}
                        </motion.span>
                      )}
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        {stat.value.includes('.') ? count.toFixed(0) : count}{stat.suffix}
                      </motion.span>
                    </motion.dd>
                  </motion.div>
                );
              })}
            </motion.dl>
          </div>
        </div>
      </motion.section>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-8 mb-80">
          <p className="font-avenir font-normal text-[45px] text-center">Product List</p>
          <Spinner size="lg" />
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16 relative z-10"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div>
              <p className="font-avenir font-normal text-[45px] text-center">Product List</p>
              {products.length > 0 ? (
                <p className="mt-3 text-md text-gray-600 dark:text-gray-400 leading-relaxed font-montserrat font-light text-center">
                  The most popular ones 💫
                </p>
              ) : (
                <div className="flex flex-col justify-center items-center py-8 mb-80">
                  <Spinner size="lg" />
                </div>
              )}
            </div>

            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              breakpoints={{
                680: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              className="product-swiper px-12 py-12"
            >
              {products && products.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard className='w-full sm:w-[430px] ' product={product} currency={currency} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='flex justify-center items-center mt-5'>
            <Link to='/showroom'>
              <Button color="dark" size='lg' outline className='font-montserrat'>
                Show more
              </Button>
            </Link>
          </div>
        </motion.section>
      )}
      <FooterBanner />

    </>
  )
}
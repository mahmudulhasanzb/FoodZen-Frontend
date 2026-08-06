import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const HeroSection = () => {
  return (

      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-24">
        {/* Abstract Background Accents */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-red-900/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Hero Content Container */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col items-start text-left space-y-6 lg:max-w-xl">
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white">
              Order Your <br />
              <span className="text-yellow-400 relative inline-block">
                Favorites
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-yellow-300/40"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,10 100,5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-red-100 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              Freshly grilled patties, melting premium cheese, and our signature
              sauce. The perfect bite is waiting for you. Get it hot and fast!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                href="/menu"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 text-red-950 font-extrabold px-4 py-3 rounded-full text-sm hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/10 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order Now</span>
              </Link>

              <Link
                href="/menu"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/80 text-white font-bold px-3 py-3 rounded-full text-sm hover:bg-white hover:text-red-700 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Burger Image & Accents */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Burger Image */}
            <div className="animate-float cursor-grab active:cursor-grabbing max-w-[340px] sm:max-w-[460px] md:max-w-[540px]">
              <img
                src="https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png"
                alt="Yummy Cheeseburger"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] select-none"
              />
              {/* <Image
                src="https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png"
                alt="Yummy Cheeseburger"
                width={600}
                height={600}
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] select-none"
                priority
              /> */}
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;

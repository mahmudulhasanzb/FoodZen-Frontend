import { Button } from '@heroui/react';
import { Flame, ShoppingBag, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div
      className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl overflow-hidden shadow-md hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.12)] dark:hover:shadow-[0_20px_40px_-15px_rgba(250,204,21,0.08)] hover:-translate-y-1 hover:border-red-500/20 dark:hover:border-yellow-500/20 transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
        {product?.rating >= 4.9 ? (
          <span className="inline-flex items-center gap-1 bg-red-700 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 fill-yellow-400  " />
            Popular
          </span>
        ) :
          // ToDo: Add new badge for best seller
          (
          <div />
        )}
        {product?.spicy && (
          <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            <Flame className="w-3 h-3 fill-white animate-pulse" />
            Spicy
          </span>
        )}
      </div>

      <Link href={`/all-foods/${product.id}`} className="flex flex-col flex-grow">
        {/* Card Image Section */}
        <div className="relative flex justify-center items-center py-8 select-none overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="absolute w-40 h-40 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-2xl group-hover:scale-105 transition-transform duration-500" />

          {/* TODO: use next Image */}
          <img
            src={product?.image}
            alt={product?.name}
            className="w-44 h-44 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 ease-out"
          />
        </div>

        {/* Card Content & Details */}
        <div className="px-6 pt-5 pb-4 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-2.5 text-xs">
            <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400 dark:fill-yellow-400" />
              <span>{product?.rating?.toFixed(1)}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              {product?.calories}
            </span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug mb-2 group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
            {product?.name}
          </h3>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed flex-grow">
            {product?.description}
          </p>
        </div>
      </Link>

      {/* Pricing and Action */}
      <div className="flex items-center justify-between p-6 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-900/30">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-extrabold">
            Price
          </span>
          <span className="text-2xl font-extrabold text-red-600 dark:text-yellow-400">
            ${product?.price?.toFixed(2)}
          </span>
        </div>

        <Link href={`/payment/${product?.id}`}>
          <Button className="inline-flex items-center gap-2 bg-yellow-400 text-red-950 font-extrabold px-5 py-3 rounded-2xl hover:bg-yellow-300 hover:scale-102 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-yellow-400/20 cursor-pointer">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs tracking-wider uppercase">Order Now</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

import React from 'react';
import { Sparkles } from 'lucide-react';

import ProductCard from '@/src/components/products/Products';

const Products = [
  {
    id: 1,
    name: 'Zen Signature Burger',
    price: 12.99,
    rating: 4.9,
    description:
      'Juicy Angus beef, premium cheddar, caramelized onions, and our secret Zen sauce.',
    image: 'https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png',
    spicy: false,
    calories: '650 kcal',
  },
  {
    id: 2,
    name: 'Spicy Inferno Burger',
    price: 11.49,
    rating: 4.8,
    description:
      'Crispy chicken patty, hot pepper relish, pepper jack cheese, and spicy sriracha aioli.',
    image: 'https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png',
    spicy: true,
    calories: '580 kcal',
  },
  {
    id: 3,
    name: 'Double Zen Stack',
    price: 15.99,
    rating: 5.0,
    description:
      'Two flame-grilled beef patties, double cheese, crispy onion rings, and bacon strips.',
    image: 'https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png',
    spicy: false,
    calories: '920 kcal',
  },
  {
    id: 4,
    name: 'Classic Cheeseburger',
    price: 9.99,
    rating: 4.7,
    description:
      'Premium beef patty, melting American cheese, pickles, mustard, and tomato sauce.',
    image: 'https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png',
    spicy: false,
    calories: '520 kcal',
  },
  {
    id: 5,
    name: 'Truffle Mushroom Zen',
    price: 13.99,
    rating: 4.9,
    description:
      'Flame-grilled beef patty, Swiss cheese, sautéed wild mushrooms, and rich truffle butter.',
    image: 'https://i.ibb.co.com/gMRc9ztD/burger-removebg-preview.png',
    spicy: false,
    calories: '710 kcal',
  },
];

const AllProductsPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white py-12 md:py-14 px-6 text-center overflow-hidden">
        {/* Background blobs for visual depth */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-800/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto pt-20">
          <span className="inline-flex items-center gap-1.5 text-yellow-400 font-bold uppercase tracking-widest text-xs px-3.5 py-1.5 bg-yellow-400/10 rounded-full border border-yellow-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            Gastronomy Menu
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-6 mb-6 text-white leading-tight">
            Explore Culinary{' '}
            <span className="text-yellow-400">Masterpieces</span>
          </h1>
          <p className="text-red-100/80 text-sm md:text-base max-w-xl mx-auto font-medium">
            Savor the rich flavors of our masterfully prepared dishes, each
            crafted with the freshest ingredients and cooked to perfection.
          </p>
        </div>
      </section>

      {/* Main Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {Products.map(product => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

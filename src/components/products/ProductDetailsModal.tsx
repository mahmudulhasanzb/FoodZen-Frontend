'use client';

import Image from 'next/image';
import {
  Sparkles,
  X,
  Tag,
  DollarSign,
  Flame,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  PackageOpen,
  Mail,
} from 'lucide-react';
import { Button } from '@heroui/react';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#0f0f11] border border-white/10 rounded-3xl max-w-lg w-full p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-5 relative overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20 mb-2">
              <Sparkles size={11} />
              <span>Product Details</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {product.title || product.name || 'Untitled Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer border border-white/5"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-inner group">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title || 'Product Image'}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/90">
              <PackageOpen size={36} className="text-zinc-500 mb-1" />
              <span className="text-xs font-semibold text-zinc-400">
                No image available
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-1">
            Description
          </span>
          <p className="text-zinc-300 text-xs leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
            {product.description || 'No description provided.'}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {/* Price */}
          <div className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/20">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1 mb-0.5">
              <DollarSign size={11} className="text-red-400" /> Price
            </span>
            <span className="text-sm font-black text-red-400">
              ${Number(product.price || 0).toFixed(2)}
            </span>
          </div>

          {/* Category */}
          <div className="p-2.5 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1 mb-0.5">
              <Tag size={11} className="text-yellow-400" /> Category
            </span>
            <span className="text-xs font-extrabold text-yellow-400 capitalize">
              {product.category || 'General'}
            </span>
          </div>

          {/* Stock Availability */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-0.5">
              Availability
            </span>
            {product.isAvailable ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                <CheckCircle2 size={12} /> In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400">
                <XCircle size={12} /> Out of Stock
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1 mb-0.5">
              <Star size={11} className="text-yellow-400 fill-yellow-400" />{' '}
              Rating
            </span>
            <span className="text-xs font-extrabold text-white">
              {product.ratings ?? 0.0} / 5.0
            </span>
          </div>

          {/* Spicy */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1 mb-0.5">
              <Flame size={11} className="text-orange-400" /> Spicy Level
            </span>
            <span className="text-xs font-bold text-zinc-200 capitalize">
              {product.spicy === 'yes' ? 'Spicy 🌶️' : 'Not Spicy'}
            </span>
          </div>

          {/* Prep Time */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1 mb-0.5">
              <Clock size={11} className="text-zinc-400" /> Prep Time
            </span>
            <span className="text-xs font-bold text-zinc-200">
              {product.preparation ? `${product.preparation} mins` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Store Email Footer */}
        {product.storeEmail && (
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
            <Mail size={13} className="text-yellow-400 shrink-0" />
            <span className="truncate">
              Store:{' '}
              <strong className="text-zinc-200">{product.storeEmail}</strong>
            </span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <Button
            type="button"
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-300 text-red-950 font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all shadow-md"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

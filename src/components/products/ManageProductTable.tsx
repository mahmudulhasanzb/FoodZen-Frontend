'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Edit3,
  Eye,
  XCircle,
  Star,
  PackageOpen,
  Tag,
} from 'lucide-react';
import { LogoGithub } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import DeleteModal from '../DeleteModal';

const ManageProductTable = ({ products = [] }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Details Modal

  return (
    <div className="bg-[#0f0f11] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-black uppercase tracking-wider text-zinc-400">
              <th className="py-4 px-6">Product Info</th>
              <th className="py-4 px-4 text-center">Stock</th>
              <th className="py-4 px-4 text-center">Rating</th>
              {/* <th className="py-4 px-4 text-center">Upcoming</th> */}
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-sm">
            {products.length > 0 ? (
              products.map(product => {
                return (
                  <tr
                    key={product._id}
                    className="hover:bg-yellow-400/[0.02] transition-all duration-200 group"
                  >
                    {/* Product Thumbnail & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-14 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shrink-0 shadow-inner group-hover:border-yellow-400/30 transition-colors">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.title || 'Product Image'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900/80">
                              <PackageOpen size={22} className="text-zinc-500" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-base tracking-tight truncate group-hover:text-yellow-400 transition-colors duration-200">
                            {product.title}
                          </h3>
                          <p className="text-xs text-zinc-400 truncate max-w-xs mt-0.5 font-medium">
                            {product.description || 'No description provided.'}
                          </p>

                          {/* Price & Category */}
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                              <Tag size={10} />
                              <span>{product.category}</span>
                            </span>
                            
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                                ${Number(product.price).toFixed(2)}
                              </span>
                           
                          </div>
                        </div>
                      </div>
                    </td>

                    {/*  Stock Badge */}
                    <td className="py-4 px-4 text-center">
                      {product?.isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                          <CheckCircle2 size={12} />
                          <span>In Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]">
                          <XCircle size={12} />
                          <span>Out of stock</span>
                        </span>
                      )}
                    </td>

                    {/* Rating Badge */}
                    <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span>{product.ratings}</span>
                        </span>         
                    </td>

                    {/* Upcomming options */}
                    {/* <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-400 border border-white/5 rounded-full px-2 py-0.5 bg-zinc-900/50">Coming Soon</span>
                      </div>
                    </td> */}

                    {/* Actions: Details, Edit, Delete */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={13} />
                          <span>Details</span>
                        </Button>

                        <Link
                          href={`/dashboard/store/manage-product/${product._id}`}
                        >
                          <Button
                            className="px-3 py-1.5 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-xs font-extrabold border border-yellow-400/30 flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_2px_10px_rgba(250,204,21,0.1)]"
                            title="Edit Product"
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </Button>
                        </Link>
                        {/* Delete Modal */}
                        <DeleteModal product={product} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-zinc-500">
                    <div className="p-4 rounded-2xl bg-yellow-400/5 border border-yellow-400/10 mb-3">
                      <PackageOpen size={40} className="text-yellow-400/60" />
                    </div>
                    <p className="text-base font-bold text-zinc-300">
                      No products found
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                      There are currently no products registered for this store.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Popup Component */}
      {/* <ProductDetailsModal
        Product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      /> */}
    </div>
  );
};

export default ManageProductTable;

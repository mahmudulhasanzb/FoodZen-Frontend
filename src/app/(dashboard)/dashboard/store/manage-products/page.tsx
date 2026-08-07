import Link from 'next/link';
import { Sparkles, Plus, FolderGit2, Globe, FileText } from 'lucide-react';
import { Button } from '@heroui/react';


const ManageProductsPage = async () => {
  // const products = await getAllProducts();
  const products = [{
    _id: '1',
    name:'Product 1',
    description:'Description 1',
    price:10,
    image:'https://example.com/image1.jpg',
    isActive:true,
    category:'Category 1',
   
  }, { 
    _id:'2',
    name:'Product 2',
    description:'Description 2',
    price:20,
    image:'https://example.com/image2.jpg',
    isAvailable:false,
    category:'Category 2',
   
  }]

  const totalCount = products.length;
  const inStockCount = products.filter(
    product => product.isAvailable === true || product.isAvailable === 'true',
  ).length;
  const outOfStockCount = products.filter(
    product => product.isAvailable === false || product.isAvailable === 'false',
  ).length;

  return (
    <div className="flex-1 min-h-screen bg-[#0a0a0a] px-6 py-8 overflow-y-auto">
      {/* Header & Stats */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 text-[10px] font-mono uppercase tracking-wider mb-3">
            <Sparkles size={10} />
            <span>Product Management</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>Manage Products</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 font-semibold">
              {totalCount} Total
            </span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Review, edit, publish, or remove products from your menu.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link href="/dashboard/store/add-product">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-red-950 font-extrabold px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all text-xs shadow-[0_4px_24px_rgba(250,204,21,0.25)] hover:shadow-[0_4px_24px_rgba(250,204,21,0.4)]">
              <Plus size={16} />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ---Quick Summary Cards--- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-white/5 bg-[#0f0f11] flex items-center justify-between hover:border-yellow-400/20 transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-yellow-400/10 text-yellow-400">
              <FolderGit2 size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Total Products
              </p>
              <p className="text-xl font-black text-white">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-[#0f0f11] flex items-center justify-between hover:border-emerald-500/20 transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Globe size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Instock
              </p>
              <p className="text-xl font-black text-white">{inStockCount}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-[#0f0f11] flex items-center justify-between hover:border-red-500/20 transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Out of Stock
              </p>
              <p className="text-xl font-black text-white">{outOfStockCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table Component */}

    </div>
  );
};

export default ManageProductsPage;

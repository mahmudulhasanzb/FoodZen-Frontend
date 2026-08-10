'use client';

import { deleteProductById } from '../lib/api/products/action';
import { AlertDialog, Button } from '@heroui/react';
import { Trash2, FolderGit2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

const DeleteModal = ({ product }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading('Deleting product...');

    try {
      const res = await deleteProductById(product._id);
      if (res) {
        toast.success('Product deleted successfully!', { id: toastId });
        router.refresh();
      } else {
        toast.error('Failed to delete product.', { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.', {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
      >
        <Trash2 size={13} />
        <span>Delete</span>
      </Button>

      <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <AlertDialog.Container className="flex items-center justify-center min-h-screen w-full">
          <AlertDialog.Dialog className="bg-[#0c0c0e] border border-white/[0.08] rounded-2xl p-6 w-full max-w-[380px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(239,68,68,0.02)] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
            <AlertDialog.CloseTrigger className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border border-transparent" />

            <AlertDialog.Header className="flex flex-col items-start text-left mt-2">
              <span className="text-[9px] font-mono tracking-[0.25em] text-red-500 font-bold uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                System Alert: Destructive Action
              </span>
              <AlertDialog.Heading className="text-xl font-bold text-white tracking-tight mt-2.5">
                Delete Product?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="mt-5 text-left">
              {/* Product preview card */}
              <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl p-3 flex items-center gap-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
                <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title || 'Product Image'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                      <FolderGit2 size={16} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-xs truncate leading-snug">
                    {product.name}
                  </h4>
                  {product.description && (
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5 max-w-xs leading-none">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Warnings details block */}
              <div className="mt-4 flex gap-2.5 items-start bg-red-950/10 border border-red-500/10 p-3 rounded-xl">
                <AlertTriangle
                  size={15}
                  className="text-red-400 shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-neutral-400 leading-normal">
                  You are performing a destructive action. This will permanently
                  delete this product and erase all associated links and
                  documents.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer className="mt-6 flex items-center justify-end gap-3 w-full border-t border-white/[0.06] pt-4">
              <Button
                slot="close"
                variant="tertiary"
                className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer outline-none border border-transparent hover:border-white/5"
              >
                Cancel Action
              </Button>
              <Button
                slot="close"
                variant="danger"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer outline-none shadow-[0_0_20px_rgba(239,68,68,0.05)]"
              >
                Confirm Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteModal;

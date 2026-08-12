'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
} from '@heroui/react';
import {
  Edit3,
  Tag,
  DollarSign,
  Flame,
  Clock,
  MessageSquare,
  Check,
  ChevronDown,
  Sparkles,
  Link as LinkIcon,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { serverMutation } from '@/src/lib/api/mutation';

export interface ProductFormValues {
  title: string;
  description: string;
  price: number;
  kcal: number;
  spicy: string;
  category: string;
  preparation: number;
  imageUrl: string;
}

interface ProductUpdateFormProps {
  product: ProductFormValues;
  id: string;
}

export default function ProductUpdateForm({ product, id }: ProductUpdateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || '',
      kcal: product?.kcal || '',
      spicy: product?.spicy || 'no',
      category: product?.category || '',
      preparation: product?.preparation || '',
      imageUrl: product?.imageUrl || '',
    },
  }
);


  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const productData = {
        ...data,
      };

      const updateResult = await serverMutation(
        `/api/products/${id}`,
        'PATCH',
        productData,
      );

      if (updateResult) {
        toast.success('Product updated successfully!');
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-1 shadow-2xl border border-red-100/5 my-8">
      <div className="flex items-center justify-center rounded-3xl bg-surface p-4 md:p-8">
        <Surface className="w-full">
          <div className="mb-4">
            <Link
              href="/dashboard/store/manage-products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Products</span>
            </Link>
          </div>

          {/* Update Product Form UI */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset className="w-full">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-xl">
                  <Edit3 className="w-6 h-6" />
                </div>
                <div>
                  <Fieldset.Legend className="text-xl font-extrabold text-red-950 dark:text-white leading-tight">
                    Update Product Item
                  </Fieldset.Legend>
                  <Description className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">
                    Modify details to update dish specifications in your store menu.
                  </Description>
                </div>
              </div>

              <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full pt-4">
                {/* Title */}
                <div className="col-span-1 md:col-span-2">
                  <TextField isRequired isInvalid={!!errors.title} name="title">
                    <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      Product Title
                    </Label>
                    <input
                      placeholder="e.g. Spicy Artisan Ramen"
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                      {...register('title', {
                        required: 'Product title is required',
                        minLength: {
                          value: 2,
                          message: 'Title must be at least 2 characters',
                        },
                      })}
                    />
                    {errors.title && (
                      <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                        {errors.title.message as string}
                      </FieldError>
                    )}
                  </TextField>
                </div>

                {/* Image URL */}
                <div className="col-span-1 md:col-span-2">
                  <TextField
                    isRequired
                    isInvalid={!!errors.imageUrl}
                    name="imageUrl"
                  >
                    <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      <LinkIcon className="w-3.5 h-3.5 text-zinc-400" />
                      Image URL
                    </Label>
                    <input
                      placeholder="e.g. https://example.com/image.jpg"
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                      {...register('imageUrl', {
                        required: 'Image URL is required',
                      })}
                    />
                    {errors.imageUrl && (
                      <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                        {errors.imageUrl.message as string}
                      </FieldError>
                    )}
                  </TextField>
                </div>

                {/* Price */}
                <TextField isRequired isInvalid={!!errors.price} name="price">
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                    Price ($)
                  </Label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="14.99"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                    {...register('price', {
                      required: 'Price is required',
                      min: {
                        value: 0.01,
                        message: 'Price must be greater than 0',
                      },
                    })}
                  />
                  {errors.price && (
                    <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                      {errors.price.message as string}
                    </FieldError>
                  )}
                </TextField>

                {/* Kcal */}
                <TextField isRequired isInvalid={!!errors.kcal} name="kcal">
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    <Flame className="w-3.5 h-3.5 text-zinc-400" />
                    Kcal (Calories)
                  </Label>
                  <input
                    type="number"
                    placeholder="650"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                    {...register('kcal', {
                      required: 'Kcal is required',
                      min: { value: 0, message: 'Kcal cannot be negative' },
                    })}
                  />
                  {errors.kcal && (
                    <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                      {errors.kcal.message as string}
                    </FieldError>
                  )}
                </TextField>

                {/* Spicy */}
                <TextField isRequired isInvalid={!!errors.spicy} name="spicy">
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    Spicy
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 cursor-pointer appearance-none !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white"
                      {...register('spicy', {
                        required: 'Spicy option is required',
                      })}
                    >
                      <option value="no">No (Not Spicy)</option>
                      <option value="yes">Yes (Spicy)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.spicy && (
                    <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                      {errors.spicy.message as string}
                    </FieldError>
                  )}
                </TextField>

                {/* Preparation Time */}
                <TextField
                  isRequired
                  isInvalid={!!errors.preparation}
                  name="preparation"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    Preparation Time (mins)
                  </Label>
                  <input
                    type="number"
                    placeholder="15"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                    {...register('preparation', {
                      required: 'Preparation time is required',
                    })}
                  />
                  {errors.preparation && (
                    <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                      {errors.preparation.message as string}
                    </FieldError>
                  )}
                </TextField>

                {/* Category */}
                <TextField
                  isRequired
                  isInvalid={!!errors.category}
                  name="category"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400" />
                    Category
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 cursor-pointer appearance-none !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white"
                      {...register('category', {
                        required: 'Category option is required',
                      })}
                    >
                      <option value="">Select Category</option>
                      <option value="fast-food">Fast Food</option>
                      <option value="dessert">Dessert</option>
                      <option value="non-veg">Non-Veg</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.category && (
                    <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                      {errors.category.message as string}
                    </FieldError>
                  )}
                </TextField>

                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <TextField
                    isRequired
                    isInvalid={!!errors.description}
                    name="description"
                    className="w-full"
                  >
                    <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                      Description
                    </Label>
                    <textarea
                      placeholder="Describe the dish ingredients, taste profile, and details..."
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm !text-zinc-900 dark:!text-white hover:!text-zinc-900 dark:hover:!text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200 resize-none"
                      rows={4}
                      {...register('description', {
                        required: 'Description is required',
                        minLength: {
                          value: 10,
                          message: 'Description must be at least 10 characters',
                        },
                      })}
                    />
                    {errors.description && (
                      <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1 block">
                        {errors.description.message as string}
                      </FieldError>
                    )}
                  </TextField>
                </div>
              </Fieldset.Group>

              {/* Submit Action */}
              <Fieldset.Actions className="flex items-center justify-end gap-4 w-full mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-red-950 font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-1 h-4 w-4 text-red-950"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Updating Product...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Update Product</span>
                    </>
                  )}
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}

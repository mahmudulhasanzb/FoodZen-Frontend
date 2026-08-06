'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChefHat,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader,
} from 'lucide-react';
import { Button, Input, Label, TextField, FieldError } from '@heroui/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authClient } from '@/src/lib/auth-client';
import { useRouter } from 'next/navigation';

// custom logo
const googleCustomLogo = (
  <>
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  </>
);

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    await authClient.signUp.email(
      {
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
      },
      {
        onSuccess: () => {
          toast.success('Signed up successfully!');
          router.push('/');
        },
        onError: ({ error }) => {
          toast.error(error?.message || 'Signed up failed');
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-zinc-900 px-6 py-12 relative overflow-hidden font-sans">
      {/* Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Card */}
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-8 shadow-2xl relative z-10 transition-colors duration-300">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-400 flex items-center justify-center mb-3 shadow-md shadow-yellow-500/25">
            <ChefHat className="w-6 h-6 text-red-950" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Create your account
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 text-center">
            Join the FoodZen Gastronomy Club
          </p>
        </div>

        {/* Google Social Login */}
        <Button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors duration-200 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-transparent"
        >
          {googleCustomLogo}
          Sign up with Google
        </Button>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800/80"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-zinc-400 dark:text-zinc-500 font-bold">
              Or with email
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <TextField isInvalid={!!errors.name} name="name">
            <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block mb-1">
              Full Name
            </Label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-red-500 transition-colors duration-200">
                <User className="w-4 h-4" />
              </span>
              <Input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:focus:border-yellow-500/50 transition-all duration-200 text-sm"
              />
            </div>
            {errors.name && (
              <FieldError className="text-red-500 text-xs mt-1 block">
                {errors.name.message as string}
              </FieldError>
            )}
          </TextField>

          {/* Email Input */}
          <TextField isInvalid={!!errors.email} name="email">
            <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block mb-1">
              Email Address
            </Label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-red-500 transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </span>
              <Input
                type="email"
                placeholder="john@example.com"
                {...register('email', { required: 'Email is required' })}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:focus:border-yellow-500/50 transition-all duration-200 text-sm"
              />
            </div>
            {errors.email && (
              <FieldError className="text-red-500 text-xs mt-1 block">
                {errors.email.message as string}
              </FieldError>
            )}
          </TextField>

          {/* Password Input */}
          <TextField isInvalid={!!errors.password} name="password">
            <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block mb-1">
              Password
            </Label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-red-500 transition-colors duration-200">
                <Lock className="w-4 h-4" />
              </span>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-10 pr-10 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:focus:border-yellow-500/50 transition-all duration-200 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <FieldError className="text-red-500 text-xs mt-1 block">
                {errors.password.message as string}
              </FieldError>
            )}
          </TextField>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 mt-0.5 rounded border-zinc-300 text-red-600 focus:ring-red-500/30 cursor-pointer accent-red-600"
            />
            <Label
              htmlFor="terms"
              className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal cursor-pointer select-none"
            >
              I agree to the{' '}
              <a
                href="#"
                className="font-bold text-red-600 dark:text-yellow-500 hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="font-bold text-red-600 dark:text-yellow-500 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-red-950 font-extrabold py-3.5 px-4 rounded-2xl hover:bg-yellow-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 shadow-md hover:shadow-yellow-400/20 cursor-pointer mt-4"
          >
            {isSubmitting ? (
              <>
                <span>Creating...</span>
                <Loader className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-bold text-red-600 dark:text-yellow-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

// components/HeroSection.tsx
import Image from 'next/image';
import { GenerateRecipeForm } from '@/components/GenerateRecipeForm';
import { HeroSectionProps } from "@/types";

export function HeroSection({ onRecipeGenerated }: HeroSectionProps) {
  return (
    <section 
      id="home" 
      className="relative bg-white min-h-screen flex items-center justify-center p-5 md:py-24 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight uppercase">
            Turn what’s in your fridge into <span className="text-orange-500">Delicious Meals</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Just enter your ingredients, click Generate, and let AI create a personalized recipe with step-by-step instructions.
          </p>
          <div className="mt-8 p-5 md:p-0">
            <GenerateRecipeForm onRecipeGenerated={onRecipeGenerated} />
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/home/community-chef.jpeg"
            alt="Chef preparing food"
            width={500}
            height={500}
            className="z-10 full rounded-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-200 rounded-full mix-blend-multiply opacity-60 blur-3xl" />
          <div className="absolute bottom-8 right-16 w-20 h-20 bg-orange-300 rounded-full opacity-50 blur-xl animate-float" />
          <div className="absolute top-12 left-12 w-16 h-16 bg-yellow-400 rounded-full opacity-50 blur-xl animate-float-delay" />
        </div>
      </div>
    </section>
  );
}
// components/Header.tsx
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 max-w-6xl mx-auto bg-white ">
      <div className="flex items-center space-x-2">
        <ChefHat className="text-orange-500 animate-pulse"/>
        <p className="text-xl font-bold text-orange-500">AI-CHEF</p>
      </div>
      <nav className="hidden space-x-4 md:flex">
        <Link href="#home" className="text-gray-600 hover:text-orange-500">AI Recipes</Link>
        <Link href="#recipes" className="text-gray-600 hover:text-orange-500">Community</Link>
      </nav>
    </header>
  );
}
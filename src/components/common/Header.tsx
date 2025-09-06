// components/Header.tsx
"use client";

import Link from "next/link";
import { ChefHat, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 max-w-6xl mx-auto bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <ChefHat className="text-orange-500 animate-pulse" />
        <p className="text-xl font-bold text-orange-500">AI-CHEF</p>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden space-x-4 md:flex">
        <Link href="#home" className="text-gray-600 hover:text-orange-500">
          AI Recipes
        </Link>
        <Link href="#recipes" className="text-gray-600 hover:text-orange-500">
          Community
        </Link>
      </nav>

      {/* Mobile Nav (Sheet Menu) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <SheetHeader>
              <SheetTitle className="text-orange-500">AI-CHEF</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col space-y-4">
              <Link
                href="#home"
                className="text-gray-700 hover:text-orange-500"
              >
                AI Recipes
              </Link>
              <Link
                href="#recipes"
                className="text-gray-700 hover:text-orange-500"
              >
                Community
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

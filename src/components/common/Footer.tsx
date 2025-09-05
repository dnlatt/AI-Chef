// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-yellow-100/10 py-6 border-t border-gray-300">
      <div className=" text-center text-gray-500">
        &copy; {new Date().getFullYear()} AI-CHEF. All rights reserved. Powered by : D Naung Latt
      </div>
    </footer>
  );
}
import { Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-gray-600">
      <div className="flex items-center justify-center mb-2">
        <Info className="w-4 h-4 mr-2" />
        <p className="text-sm">
          This BMI calculator is for informational purposes only and does not
          collect any personal data.
        </p>
      </div>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} BMI Calculator. All rights reserved.
      </p>
    </footer>
  );
}

"use client"
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Minimal camera SVG
function MinimalCameraIcon({ className = "w-16 h-16 text-gray-400 mb-6" }) {
  return (
    <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="12" width="48" height="28" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="26" r="8" stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="8" width="6" height="6" rx="2" fill="currentColor" />
    </svg>
  );
}

export default function PhotoRecognitionPage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Simulate recognition
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      // Simulate recognition result
      setTimeout(() => {
        setResult({
          name: "Mojito",
          description: "A refreshing Cuban cocktail with mint and lime.",
          ingredients: [
            "White Rum",
            "Fresh Lime Juice",
            "Simple Syrup",
            "Soda Water",
            "Fresh Mint Leaves"
          ],
          steps: [
            "Muddle mint leaves in glass.",
            "Add rum, lime juice, and syrup.",
            "Fill with ice, top with soda water.",
            "Garnish with mint."
          ]
        });
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative w-full">
      {/* Back button */}
      <button
        className="absolute left-6 top-6 text-gray-400 hover:text-white bg-gray-800 rounded-full px-3 py-1 text-sm shadow"
        onClick={() => router.push("/")}
      >
        ← Back
      </button>
      <MinimalCameraIcon />
      <div className="border-2 border-dashed border-gray-400 rounded-xl w-72 h-56 flex flex-col items-center justify-center bg-gray-900 relative">
        {image ? (
          <img src={image} alt="drink" className="object-contain max-h-48 max-w-full rounded-md" />
        ) : (
          <>
            <button
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition mb-2"
              onClick={() => inputRef.current?.click()}
            >
              Upload Drink Image
            </button>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-gray-500 text-sm">Supported: jpg/png/jpeg</span>
          </>
        )}
      </div>
      {/* Recognition result display */}
      {result && (
        <div className="mt-8 bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-amber-400">{result.name}</h2>
          <p className="mb-2 text-gray-300">{result.description}</p>
          <div className="mb-2">
            <span className="font-semibold text-gray-400">Ingredients:</span>
            <ul className="list-disc list-inside text-gray-200">
              {result.ingredients.map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-gray-400">Steps:</span>
            <ol className="list-decimal list-inside text-gray-200">
              {result.steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
} 
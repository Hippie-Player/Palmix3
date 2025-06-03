"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Minimal user SVG icon
function MinimalUserIcon({ className = "w-16 h-16 text-gray-400 mb-6" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="30" width="28" height="10" rx="5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PlusIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const initialFavorites = [
  {
    name: "Espresso Martini",
    description: "The perfect marriage of coffee and cocktail.",
  },
  {
    name: "Classic Mojito",
    description: "A refreshing Cuban cocktail with mint and lime.",
  },
  {
    name: "Matcha Latte",
    description: "Ceremonial grade matcha with perfectly steamed milk.",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(initialFavorites);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddFavorite = () => {
    if (newName.trim()) {
      setFavorites([
        ...favorites,
        { name: newName.trim(), description: newDesc.trim() },
      ]);
      setNewName("");
      setNewDesc("");
      setShowInput(false);
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
      <MinimalUserIcon />
      <h2 className="text-2xl font-semibold text-gray-200 mb-8">My Profile</h2>
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-amber-400">My Favorites</h3>
          <button
            className="p-1 rounded-full bg-gray-700 hover:bg-amber-400 hover:text-gray-900 text-gray-300 transition"
            onClick={() => setShowInput(true)}
            aria-label="Add favorite"
          >
            <PlusIcon />
          </button>
        </div>
        {showInput && (
          <div className="mb-4 bg-gray-900 rounded-lg p-4 flex flex-col gap-2">
            <input
              className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Drink name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              maxLength={32}
            />
            <input
              className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Description (optional)"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              maxLength={64}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-1 rounded bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300 transition"
                onClick={handleAddFavorite}
              >
                Add
              </button>
              <button
                className="px-4 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                onClick={() => { setShowInput(false); setNewName(""); setNewDesc(""); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites yet.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((fav, idx) => (
              <li key={idx} className="bg-gray-900 rounded-lg p-4">
                <div className="text-base font-semibold text-white">{fav.name}</div>
                <div className="text-sm text-gray-400">{fav.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 
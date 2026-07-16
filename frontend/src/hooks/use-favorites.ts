import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: number[]; // Array of property IDs
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((fId) => fId !== id) })),
      toggleFavorite: (id) =>
        set((state) => {
          const isFav = state.favorites.includes(id);
          return {
            favorites: isFav
              ? state.favorites.filter((fId) => fId !== id)
              : [...state.favorites, id],
          };
        }),
    }),
    {
      name: "imperial-estates-favorites-v1",
    }
  )
);

export function useFavorites() {
  const [mounted, setMounted] = useState(false);
  const store = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    favorites: mounted ? store.favorites : [],
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
    toggleFavorite: store.toggleFavorite,
    isFavorite: (id: number) => (mounted ? store.favorites.includes(id) : false),
    mounted,
  };
}

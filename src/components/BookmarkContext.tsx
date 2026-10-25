"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BookmarkContextType {
  bookmarks: string[]; // array of article slugs
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  count: number;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  count: 0,
});

const STORAGE_KEY = "worktomorrow_saved_articles";

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read bookmarks:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    setBookmarks((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((s) => s !== slug);
      } else {
        updated = [...prev, slug];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save bookmarks:", e);
      }
      return updated;
    });
  };

  const isBookmarked = (slug: string) => {
    return bookmarks.includes(slug);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        count: isLoaded ? bookmarks.length : 0,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EventItem } from "../../types";
import { loadBookmarks, saveBookmarks } from "../../storage/bookmarksStorage";
interface ToggleBookmarkPayload {
  id: string;
  notificationIds?: string[];
}

type EventsState = {
  items: EventItem[];         
  bookmarks: Record<string, string[]>; 
  loadedBookmarks: boolean;
};

const initialState: EventsState = {
  items: [],
  bookmarks: {},
  loadedBookmarks: false
};

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (s, a: PayloadAction<EventItem[]>) => { s.items = a.payload; },
    
    toggleBookmark: (s, a: PayloadAction<ToggleBookmarkPayload>) => {
      const { id, notificationIds } = a.payload;
      
      if (s.bookmarks[id]) {
        delete s.bookmarks[id];
      } else {
        s.bookmarks[id] = notificationIds || [];
      }
      
      void saveBookmarks(s.bookmarks);
    },

    setBookmarks: (s, a: PayloadAction<Record<string, string[]>>) => {
      s.bookmarks = a.payload; 
      s.loadedBookmarks = true;
    }
  }
});

export const { setEvents, toggleBookmark, setBookmarks } = slice.actions;

export const selectAllEvents = (st: any) => (st as any).events.items as EventItem[];
export const selectBookmarkedIds = (st: any) => (st as any).events.bookmarks as Record<string, string[]>;
export const selectEventById = (st: any, id: string) =>
  (st as any).events.items.find((e: EventItem) => e.id === id) as EventItem | undefined;

export default slice.reducer;

export async function bootstrapBookmarks(dispatch: (a: any) => void) {
  const data = await loadBookmarks();
  dispatch(setBookmarks(data as Record<string, string[]>));
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EventItem } from "../../types";
import { loadBookmarks, saveBookmarks } from "../../storage/bookmarksStorage";

type EventsState = {
  items: EventItem[];         // from mock JSON (later Firestore)
  bookmarks: Record<string, true>;
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
    toggleBookmark: (s, a: PayloadAction<string>) => {
      const id = a.payload;
      if (s.bookmarks[id]) delete s.bookmarks[id]; else s.bookmarks[id] = true;
      // fire-and-forget persistence
      void saveBookmarks(s.bookmarks);
    },
    setBookmarks: (s, a: PayloadAction<Record<string, true>>) => {
      s.bookmarks = a.payload; s.loadedBookmarks = true;
    }
  }
});

export const { setEvents, toggleBookmark, setBookmarks } = slice.actions;
export const selectAllEvents = (st: any) => (st as any).events.items as EventItem[];
export const selectBookmarkedIds = (st: any) => (st as any).events.bookmarks as Record<string, true>;
export const selectEventById = (st: any, id: string) =>
  (st as any).events.items.find((e: EventItem) => e.id === id) as EventItem | undefined;

export default slice.reducer;

export async function bootstrapBookmarks(dispatch: (a: any) => void) {
  const data = await loadBookmarks();
  dispatch(setBookmarks(data));
}
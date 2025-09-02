import axios from "axios";
import type { Note, BaseNoteParams } from "../types/note"

const BASE_URL = "https://notehub-public.goit.study/api"
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNotes = async (page: number, query = ""): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    },
    params: {
      search: query,
      page,
      perPage: 12
    }
  });
  return res.data;
}

export const createNote = async (newNote: BaseNoteParams) => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
  return res.data;
}

export const deleteNote = async (noteId: string) => {
  await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
}

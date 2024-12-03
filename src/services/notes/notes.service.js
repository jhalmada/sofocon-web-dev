import axios from "axios";
import * as notesRoutes from "./notes.routes.js";

export class NotesService {
  static getAllNotesApi = async (params) =>
    await axios.get(notesRoutes.getNotes, { params });

  static postAddNotesApi = async (noteData) =>
    await axios.post(notesRoutes.postNotes, noteData);

  static putNoteApi = async (noteData, noteId) =>
    await axios.put(`${notesRoutes.putNotes}/${noteId}`, noteData);

  static deleteNoteApi = async (noteId) =>
    await axios.delete(`${notesRoutes.deleteNotes}/${noteId}`);
}

import { useState } from "react";
import { NotesService } from "../../services/notes/notes.service";

const usePutNotes = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedNote = async (noteData, noteId, setModified) => {
    try {
      setIsLoading(true);
      await NotesService.putNoteApi(noteData, noteId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la nota: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedNote, isChanged, isLoading };
};

export default usePutNotes;

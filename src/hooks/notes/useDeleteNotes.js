import { useState } from "react";
import { NotesService } from "../../services/notes/notes.service";

const useDeleteNotes = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteNote = async (noteId, setModified) => {
    try {
      setIsLoading(true);
      await NotesService.deleteNoteApi(noteId);
      setIsDeleted(true);
      setModified((prev) => !prev);
      console.log("Nota eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la nota: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteNote, isDeleted, isLoading };
};

export default useDeleteNotes;

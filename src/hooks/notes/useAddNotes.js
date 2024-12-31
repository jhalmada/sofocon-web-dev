import { useCallback, useState } from "react";
import { NotesService } from "../../services/notes/notes.service.js";

const useAddNotes = () => {
  const [loading, setLoading] = useState(false);

  const postAddNotes = useCallback(async (noteData) => {
    try {
      setLoading(true);
      const { data } = await NotesService.postAddNotesApi(noteData);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddNotes, loading };
};

export default useAddNotes;

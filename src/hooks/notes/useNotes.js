import { useEffect, useState } from "react";
import { NotesService } from "../../services/notes/notes.service";
const useNotes = () => {
  const [notesResponse, setNotesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const getAllNotes = async () => {
    try {
      setLoading(true);
      const { data } = await NotesService.getAllNotesApi({
        page,
        itemsPerPage,
        search,
      });
      setTotalPage(data.pagination.totalPages);
      setNotesResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [page, itemsPerPage, modified]);
  return {
    notesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
    setSearch,
  };
};

export default useNotes;

import { useEffect, useState } from "react";
import { NotesService } from "../../services/notes/notes.service";
const useNotes = () => {
  const [notesResponse, setNotesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [client, setClient] = useState(null);
  const getAllNotes = async () => {
    try {
      setLoading(true);
      const { data } = await NotesService.getAllNotesApi({
        page,
        itemsPerPage,
        search,
        client,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setNotesResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [page, itemsPerPage, modified, client]);
  return {
    notesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
    setSearch,
    client,
    setClient,
  };
};

export default useNotes;

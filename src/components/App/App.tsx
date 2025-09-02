import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 1000);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchNotes(page, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isError && data?.notes.length === 0) {
      toast.error("No notes found");
    }
  }, [isError, data]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onChange={(query) => {
            setSearchQuery(query);
            setPage(1);
          }}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pagesCount={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <Loader />}
        {isSuccess && <NoteList notes={data.notes} />}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <Toaster
        position={isSuccess && data.totalPages > 1 ? "top-left" : "top-center"}
      />
    </div>
  );
}

export default App;

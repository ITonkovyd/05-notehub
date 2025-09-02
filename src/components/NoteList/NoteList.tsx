import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import { useNoteMutation } from '../../hooks/useNoteMutation';

const NoteList = ({ notes }: { notes: Note[] }) => {
  const deletingMutation = useNoteMutation({
    mutationFn: (id: string) => deleteNote(id),
    queryKey: ["notes"],
    successMsg: "Note deleted successfully",
    errorMsg: "Error deleting note"
  });

  return (
    <ul className={css.list}>
      {notes.map(note => { 
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button} onClick={() => deletingMutation.mutate(note.id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </ul>
  );
};

export default NoteList;

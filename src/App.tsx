/* eslint-disable @typescript-eslint/no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./pages/NoteList";
import NoteLayout from "./layout/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

type Note = {
  id: string;
} & NoteData;

type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};

type RawNote = {
  id: string;
} & RawNoteData;

type RawNoteData = {
  title: string;
  markDown: string;
  tagIds: string[];
};

type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((n) => {
      return { ...n, tags: tags.filter((t) => n.tagIds.includes(t.id)) };
    });
  }, [notes, tags]);
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => [
      ...prev,
      { ...data, id: uuidV4(), tagIds: tags.map((t) => t.id) },
    ]);
  }
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id)
          return { ...n, ...data, tagIds: tags.map((t) => t.id) };
        else return n;
      })
    );
  }
  function onDelete(id: string) {
    setNotes((Prev) => Prev.filter((n) => n.id !== id));
  }
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  function updateTag(id: string, label: string) {
    setTags((prev) =>
      prev.map((t) => {
        if (t.id === id) return { ...t, label };
        else return t;
      })
    );
  }
  function deleteTag(id: string) {
    setTags((Prev) => Prev.filter((t) => t.id !== id));
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="react-notes-app/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
        />
        <Route
          path="react-notes-app/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path="react-notes-app/:id"
          element={<NoteLayout notes={notesWithTags} />}
        >
          <Route index element={<Note onDelete={onDelete} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="react-notes-app/" />} />
      </Routes>
    </Container>
  );
};
export default App;
export type { Note, NoteData, Tag };

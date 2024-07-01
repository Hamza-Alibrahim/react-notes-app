import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";
import { useNote } from "../layout/NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">EditNote</h1>
      <NoteForm
        title={note.title}
        tags={note.tags}
        markDown={note.markDown}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};
export default EditNote;

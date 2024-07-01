import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title)) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [selectedTags, title, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Note</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="new">
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setShow(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((t: Tag) => {
                  return { label: t.label, value: t.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((t) => {
                      return { id: t.value, label: t.label };
                    })
                  )
                }
                options={availableTags.map((t: Tag) => {
                  return { label: t.label, value: t.id };
                })}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={show}
        handleClose={() => setShow(false)}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  );
};
export default NoteList;

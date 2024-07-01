import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../layout/NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NotePrpos = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NotePrpos) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((t) => {
                return (
                  <Badge key={t.id} className="text-truncate">
                    {t.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="edit">
              <Button>Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markDown}</ReactMarkdown>
    </>
  );
};
export default Note;

import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = Partial<NoteData> & {
  availableTags: Tag[];
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
};

const NoteForm = ({
  title = "",
  tags = [],
  markDown = "",
  availableTags,
  onSubmit,
  onAddTag,
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title:
        titleRef.current?.value !== undefined ? titleRef.current.value : "",
      markDown:
        markDownRef.current?.value !== undefined
          ? markDownRef.current.value
          : "",
      tags: selectedTags,
    });
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={title} ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((t) => {
                  return { label: t.label, value: t.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((t) => {
                      return { id: t.value, label: t.label };
                    })
                  )
                }
                options={availableTags.map((t) => {
                  return { label: t.label, value: t.id };
                })}
                isMulti
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="markDown">
              <Form.Label>Body</Form.Label>
              <Form.Control
                defaultValue={markDown}
                ref={markDownRef}
                as={"textarea"}
                rows={15}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button type="submit">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
export default NoteForm;

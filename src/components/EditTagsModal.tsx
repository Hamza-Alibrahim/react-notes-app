import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  updateTag,
  deleteTag,
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((t) => (
              <Row key={t.id}>
                <Col>
                  <Form.Control
                    value={t.label}
                    onChange={(e) => updateTag(t.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTag(t.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditTagsModal;

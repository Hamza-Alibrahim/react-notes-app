import { Badge, Card, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { Link } from "react-router-dom";
import styles from "../NoteList.module.css";

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <h3>{title}</h3>
          {tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
              className="justify-content-center flex-wrap"
            >
              {tags.map((t) => {
                return (
                  <Badge key={t.id} className="text-truncate">
                    {t.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};
export default NoteCard;

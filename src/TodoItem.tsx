import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import { TodoItemProps } from "./types";

export function TodoItem({
  todo,
  onDeleteTodo,
  onEditTodo,
  onShowModal,
}: TodoItemProps) {
  const handleCheckChange = () => {
    onEditTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <Row className="bg-white align-items-center p-1 rounded">
      <Col>
        <Stack gap={2} direction="horizontal">
          <Form.Check checked={todo.completed} onChange={handleCheckChange} />
          <Stack>
            <p
              style={{
                fontSize: "1rem",
                margin: 0,
                textDecoration: todo.completed ? "line-through" : "",
              }}
            >
              {todo.title}
            </p>
            <p style={{ fontSize: "0.7rem", margin: 0 }}>{todo.timeAdded}</p>
          </Stack>
        </Stack>
      </Col>
      <Col className="d-flex justify-content-end">
        <Stack gap={1} direction="horizontal">
          <Button
            onClick={() => onDeleteTodo(todo.id)}
            variant="light"
            className="d-flex"
          >
            <FaTrash />
          </Button>
          <Button
            onClick={() => onShowModal(todo)}
            variant="light"
            className="d-flex"
          >
            <FaPen />
          </Button>
        </Stack>
      </Col>
    </Row>
  );
}

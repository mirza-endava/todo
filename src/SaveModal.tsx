import { useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { SaveModalProps } from "./types";

export function SaveModal({
  isShown,
  handleClose,
  selectedTodo,
  onAddTodo,
}: SaveModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo({
      id: uuidv4(),
      title: titleRef.current!.value,
      completed: statusRef.current!.value === "1" ? true : false,
      timeAdded: new Date().toLocaleString(),
    });
    handleClose();
  };

  return (
    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add TODO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={titleRef}
              autoFocus
              required
              defaultValue={selectedTodo.title}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              ref={statusRef}
              required
              defaultValue={selectedTodo.completed ? "1" : "2"}
            >
              <option value="1">Completed</option>
              <option value="2">Incomplete</option>
            </Form.Select>
          </Form.Group>
          <Row className="mt-4">
            <Col>
              <Button type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

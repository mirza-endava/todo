import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Stack,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { SaveModal } from "./SaveModal";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const defaultTodo = {
    title: "",
    completed: false,
    timeAdded: "",
    id: "1",
  };
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);
  const [filterStatus, setFilterStatus] = useState("All");
  const filteredTodos =
    filterStatus !== "All"
      ? todos.filter((todo) => {
          if (filterStatus === "Completed") {
            return todo.completed === true;
          } else {
            return todo.completed === false;
          }
        })
      : todos;

  const onAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
    toast.success("Added TODO");
  };

  const onEditTodo = (todo: Todo) => {
    setTodos((prev) => {
      return prev.map((prevTodo) => {
        if (prevTodo.id == todo.id) {
          return todo;
        } else {
          return prevTodo;
        }
      });
    });
  };

  const onDeleteTodo = (todoId: string) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todoId));
    toast.success("Removed TODO");
  };

  const onShowModal = (todo: Todo) => {
    setIsModalShown(true);
    setSelectedTodo(todo);
  };

  return (
    <>
      <Container
        style={{
          maxWidth: "1200px",
          width: "90%",
        }}
      >
        <Row>
          <Col className="d-flex justify-content-center">
            <p className="title">TODO LIST</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Stack gap={1} style={{ maxWidth: "750px" }}>
              <Row className="p-1">
                <Col>
                  <Button onClick={() => onShowModal(defaultTodo)}>
                    Add TODO
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Dropdown
                    defaultValue={filterStatus}
                    onSelect={(eventKey: any) => setFilterStatus(eventKey)}
                  >
                    <Dropdown.Toggle variant="secondary">
                      {filterStatus}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey={"All"}>All</Dropdown.Item>
                      <Dropdown.Item eventKey={"Completed"}>
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={"Incomplete"}>
                        Incomplete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="bg-light rounded p-3 m-1">
                {filteredTodos.length ? (
                  <Stack gap={3}>
                    {filteredTodos.map((todo) => {
                      return (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onDeleteTodo={onDeleteTodo}
                          onEditTodo={onEditTodo}
                          onShowModal={onShowModal}
                        />
                      );
                    })}
                  </Stack>
                ) : (
                  <Col className="d-flex justify-content-center">
                    <h5>
                      <Badge bg="secondary">No Todos</Badge>
                    </h5>
                  </Col>
                )}
              </Row>
            </Stack>
          </Col>
        </Row>
        <SaveModal
          isShown={isModalShown}
          handleClose={() => setIsModalShown(false)}
          onAddTodo={onAddTodo}
          selectedTodo={selectedTodo}
          onEditTodo={onEditTodo}
        />
      </Container>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </>
  );
}

export default App;

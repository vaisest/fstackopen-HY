import { useState } from "react";
import { createNewBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleNewBlog = (event) => {
    event.preventDefault();

    dispatch(createNewBlog(newTitle, newAuthor, newUrl));

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");

    setVisible(false);
  };

  return (
    <div>
      <h3>Create a new blog</h3>
      <div>
        {visible && (
          <Form
            onSubmit={handleNewBlog}
            id="new-blog-form"
            className="d-inline"
          >
            <Form.Group className="mb-1 w-75" controlId="formTitle">
              <Form.Label className="mb-0">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 w-50" controlId="formAuthor">
              <Form.Label className="mb-0">Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                name="author"
                value={newAuthor}
                onChange={(event) => setNewAuthor(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-1 w-75" controlId="formUrl">
              <Form.Label className="mb-0">Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link to blog"
                name="url"
                value={newUrl}
                onChange={(event) => setNewUrl(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-1">
              Create
            </Button>
          </Form>
        )}
        <Button
          variant={visible ? "secondary" : "outline-primary"}
          onClick={toggleVisibility}
          className="my-1"
        >
          {visible ? "Cancel" : "Add a new blog"}
        </Button>
      </div>
    </div>
  );
};

export default BlogForm;

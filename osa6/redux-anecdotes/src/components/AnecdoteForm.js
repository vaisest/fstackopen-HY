import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    props.createAnecdote(content);

    event.target.anecdote.value = "";

    props.setNotification(`You added ${content}`, 10);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const actionCreators = { createAnecdote, setNotification };

const ConnectedAnecdoteForm = connect(null, actionCreators)(AnecdoteForm);
export default ConnectedAnecdoteForm;

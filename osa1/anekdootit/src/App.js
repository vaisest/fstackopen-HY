import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];
  const totalCount = anecdotes.length;

  const pointState = useState(Array(totalCount).fill(0));

  return (
    <div>
      <DayAnecdote
        anecdotes={anecdotes}
        pointState={pointState}
        totalCount={totalCount}
      />
      <PopularAnecdote anecdotes={anecdotes} pointState={pointState} />
    </div>
  );
};

const DayAnecdote = ({ anecdotes, pointState, totalCount }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = pointState;

  const getRandomIntRange = (min, max) => {
    // miksei tämä ole standardifunktio
    console.log(Math.floor(Math.random() * (max - min + 1) + min));
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]} <br></br>
        has {points[selected]} votes
      </div>
      <button
        onClick={() => {
          const copy = [...points];
          copy[selected] += 1;
          setPoints(copy);
        }}
      >
        vote
      </button>
      <button onClick={() => setSelected(getRandomIntRange(0, totalCount - 1))}>
        next anecdote
      </button>
    </div>
  );
};

const PopularAnecdote = ({ anecdotes, pointState }) => {
  const [points] = pointState;

  let greatestPoints = -1;
  let greatestIdx = -1;
  for (let idx = 0; idx < anecdotes.length; idx++) {
    if (points[idx] > greatestPoints) {
      greatestPoints = points[idx];
      greatestIdx = idx;
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[greatestIdx]} <br></br>
      has {greatestPoints} votes
    </div>
  );
};

export default App;

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.name}</h2>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Total of {parts.reduce((prev, curr) => prev + curr.exercises, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

export default Course;

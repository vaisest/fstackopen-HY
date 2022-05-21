import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};

const Part = ({ course }: PartProps) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <div>{course.description}</div>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <div>project exercises {course.groupProjectCount}</div>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <div>{course.description}</div>
          <div>submit to {course.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <div>{course.description}</div>
          <div>required skills: {course.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;

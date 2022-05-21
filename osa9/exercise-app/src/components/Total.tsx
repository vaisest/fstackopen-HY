import { CoursePart } from "../types";

interface TotalProps {
  courses: CoursePart[];
}

const Total = ({ courses }: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courses
          .map((course) => course.exerciseCount)
          .reduce((prev, curr) => prev + curr, 0)}
      </p>
    </div>
  );
};

export default Total;

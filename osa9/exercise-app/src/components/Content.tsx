import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
      {courses.map((course) => (
        <Part course={course} key={course.name}></Part>
      ))}
    </div>
  );
};

export default Content;

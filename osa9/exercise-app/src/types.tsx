interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseCommentedPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseCommentedPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseCommentedPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseCommentedPart {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

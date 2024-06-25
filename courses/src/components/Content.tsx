import { CoursePart } from "../App";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </>
  );
};

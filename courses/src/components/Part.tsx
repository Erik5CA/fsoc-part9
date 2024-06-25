import { CoursePart } from "../App";

export const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic": {
      return (
        <>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <p>{course.description}</p>
        </>
      );
    }
    case "background": {
      return (
        <>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <p>{course.description}</p>
          <p>submit to {course.backgroundMaterial}</p>
        </>
      );
    }
    case "group": {
      return (
        <>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <p>project exercises {course.groupProjectCount}</p>
        </>
      );
    }
    case "special": {
      return (
        <>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <p>{course.description}</p>
          <p>required skills: {course.requirements.join(",")}</p>
        </>
      );
    }

    default:
      return <></>;
  }
};

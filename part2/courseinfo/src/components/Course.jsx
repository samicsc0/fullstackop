import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((accumlator, nextvalue)=>{
    return accumlator + nextvalue.exercises
  },0);
  return (
    <>
      <Header course={course.name} />
      {course.parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises} />
      ))}
      <Total total={total}/>
    </>
  );
};
export default Course;

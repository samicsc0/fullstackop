import Content from "./components/Part"
import Header from "./components/Header"
import Total from "./components/Total"
import Part from "./components/Part"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part, index) => (<Part key={index} part={part.name} exercise={part.exercise} />))}
    </div >
  )
}

export default App
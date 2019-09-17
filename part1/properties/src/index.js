import React from 'react'
import ReactDOM from 'react-dom'

const Header = (properties) => {
    return (
        <>
            <h1>{properties.title}</h1>
        </>
    )
}

const Part = (properties) => {
    return (
        <>
            <p>{properties.part.name} {properties.part.exercises}</p>
        </>
    )
}

const Content = (properties) => {
    return (
        <>
            <Part part={properties.parts[0]}/>
            <Part part={properties.parts[1]}/>
            <Part part={properties.parts[2]}/>
        </>
    )
}

const Total = (properties) => {
    const total = properties.parts.map(part => part.exercises).reduce((a, b) => a + b)

    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

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
    <>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
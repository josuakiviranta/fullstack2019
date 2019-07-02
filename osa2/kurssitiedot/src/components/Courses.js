import React from 'react'

const CourseName = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

const Total = ({ parts }) => {
    const sum = parts.reduce(function (sum, part) {
        return sum + part.exercises
    }, 0)

    return (
        <h3>total of {sum} exercises</h3>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <CourseName name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => courses.map(course => <Course course={course} />)

export default Courses
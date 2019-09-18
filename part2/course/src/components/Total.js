import React from 'react'

const Total = ({parts}) => (
    <p><b>total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</b></p>
)

export default Total

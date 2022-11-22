import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddCourseForm = () => {
  const initialState = {
    name: ''
  }
  const [formState, setFormState] = useState(initialState)

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(`${BASE_URL}/courses/new`, formState)
    const courseId = response.data.id
    setFormState(initialState)
    navigate(`/students/${courseId}`)
  }

  return (
    <div className="add-student-page">

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Course Name: </label>
        <input
          name="name"
          value={formState.name}
          type="text"
          onChange={handleChange}
          required
        />


        <button>Add Course</button>
      </form>
    </div>
  )
}


export default AddCourseForm

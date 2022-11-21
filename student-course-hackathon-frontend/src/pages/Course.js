import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import CourseCard from '../components/CourseCard'

const Course = () => {
  const [courses, setCourses] = useState([])

  const getAllCourses = async () => {
    const response = await axios.get(`${BASE_URL}/courses`)
    setCourses(response.data)
  }

  useEffect(() => {
    getAllCourses()
  }, [])

  return (
    <div className="coursecards">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default Course

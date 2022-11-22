import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../globals'

const CourseSearchBar = () => {
    const [courseSearchQuery, setCourseSearchQuery] = useState('')

    let navigate = useNavigate()

    const handleChange = (e) => {
        setCourseSearchQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${BASE_URL}/courses`)
        const allCourses = response.data
        const course = allCourses.filter((course)=> 
            courseSearchQuery.toLowerCase() === course.name.toLowerCase()
        )
        setCourseSearchQuery("")
        navigate(`/students/${course[0].id}`)
    }

    return (
        <div>
            <input type="text" placeholder="Search Courses" value={courseSearchQuery} onChange={handleChange} ></input>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default CourseSearchBar
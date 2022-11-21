import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const CourseSearchBar = () => {
    const [courseSearchQuery, setCourseSearchQuery] = useState('')

    let navigate = useNavigate()

    const handleChange = (e) => {
        setCourseSearchQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const response = axios.get(`${BASE_URL}/courses`)
        const allCourses = response.data
        const course = allCourses.filter((course)=> {
            courseSearchQuery === course.name
        })
        navigate(`/students/${course[0].id}`)
    }

    return (
        <div>
            <input type="text" placeholder="Search Courses" value={courseSearchQuery} onChange={handleChange} ></input>
            <button onSubmit={handleSubmit}>Search</button>
        </div>
    )
}

export default CourseSearchBar
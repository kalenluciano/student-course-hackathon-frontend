import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../globals'

const StudentSearchBar = () => {
    const [studentSearchQuery, setStudentSearchQuery] = useState('')

    let navigate = useNavigate()

    const handleChange = (e) => {
        setStudentSearchQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${BASE_URL}/students`)
        const allStudents = response.data
        const student = allStudents.filter((student)=> 
            studentSearchQuery.toLowerCase() === student.name.toLowerCase()
        )
        setStudentSearchQuery("")
        navigate(`/student-stats/${student[0].id}`)
    }

    return (
        <div className='student-search-bar searchBar'>
            <input type="text" placeholder="Search Students" value={studentSearchQuery} onChange={handleChange} ></input>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default StudentSearchBar
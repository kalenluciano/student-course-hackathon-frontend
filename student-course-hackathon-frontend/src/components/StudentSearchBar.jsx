import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

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
        const student = allStudents.filter((student)=> {
            studentSearchQuery === student.name
        })
        navigate(`/student-stats/${student[0].id}`)
    }

    return (
        <div>
            <input type="text" placeholder="Search Students" value={studentSearchQuery} onChange={handleChange} ></input>
            <button onSubmit={handleSubmit}>Search</button>
        </div>
    )
}

export default StudentSearchBar
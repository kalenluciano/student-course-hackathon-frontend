import {Link} from 'react-router-dom'

const StudentCard = ({student}) => {
    return (
        <Link className='student-card' to={`/student-stats/${student.id}`}>
            <h2>{student.name}</h2>
            <p>{student.email}</p>
        </Link>
    )
}

export default StudentCard
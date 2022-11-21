import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {
    return (
        <Link to={`/students/${course.id}`}>
            <h2>{course.name}</h2>
            <p>{course.grade}</p>
        </Link>
    )
}

export default CourseCard
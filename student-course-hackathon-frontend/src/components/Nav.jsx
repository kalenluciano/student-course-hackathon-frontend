import {Link} from 'react-router-dom'
import StudentSearchBar from './StudentSearchBar'
import CourseSearchBar from './CourseSearchBar'

const Nav = () => {
    return (
        <nav>
            <StudentSearchBar />
            <CourseSearchBar />
            <Link to='/'>Courses</Link>
            <Link to='/add-student'>Add Student</Link>
            <Link to='/add-course'>Add Course</Link>
        </nav>
    )
}

export default Nav
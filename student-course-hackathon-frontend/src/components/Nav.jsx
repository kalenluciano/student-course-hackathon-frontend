import {Link} from 'react-router-dom'
import StudentSearchBar from './StudentSearchBar'
import CourseSearchBar from './CourseSearchBar'

const Nav = () => {
    return (
        <nav className='nav'>
            <img 
            src= 'https://i.imgur.com/yFgnGlgm.jpg'
            className="school-logo"
            alt=""></img>
            <StudentSearchBar />
            <CourseSearchBar />
            <div className='navlinks'>
            <Link className='link' to='/'>Courses</Link>
            <Link className='link' to='/add-student'>Add Student</Link>
            <Link className='link' to='/add-course'>Add Course</Link>
            </div>
        </nav>
    )
}

export default Nav
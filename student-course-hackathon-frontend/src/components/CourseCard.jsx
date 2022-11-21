import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {
    return (
        <Link   to={`/students/${course.id}`}>
           <div className= 'coursecard'>
            <img
            src= 'https://i.imgur.com/zETEB9bm.jpg'
            className="chalkboard"
            alt="">
            </img>
             <h2>{course.name}</h2> 
             </div>
            
        </Link>
    )
}

export default CourseCard
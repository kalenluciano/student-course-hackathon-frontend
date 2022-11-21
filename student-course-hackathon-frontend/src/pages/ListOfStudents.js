import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import StudentCard from '../components/StudentCard';

const ListOfStudents = () => {
	const [studentCourse, setStudentCourse] = useState([]);

	const { course_id } = useParams();
	const courseId = parseInt(course_id);

	const getStudentsByCourseId = async () => {
		const response = await axios.get(`${BASE_URL}/student-courses/details`);
		const courses = response.data;
		const course = courses.filter((course) => course.id === courseId);
		setStudentCourse(course);
	};

	useEffect(() => {
		getStudentsByCourseId();
	}, [course_id]);

	return (
		<div>
			<h1>{studentCourse[0]?.name}</h1>
			{studentCourse &&
				studentCourse[0]?.student_courses.map((student) => (
					<StudentCard key={student.id} student={student} />
				))}
		</div>
	);
};

export default ListOfStudents;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import StudentCard from '../components/StudentCard';

const ListOfStudents = () => {
	const [studentsByCourse, setStudentsByCourse] = useState([]);

	const { course_id } = useParams();

	const getAllStudentsByCourseId = async () => {
		const response = await axios.get(`${BASE_URL}/students/${course_id}`);
		setStudentsByCourse(response.data);
	};

	useEffect(() => {
		getAllStudentsByCourseId();
	}, [course_id]);

	return (
		<div>
			{studentsByCourse.map((student) => (
				<StudentCard key={student.id} student={student} />
			))}
		</div>
	);
};

export default ListOfStudents;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';

const StudentStats = () => {
	const [student, setStudent] = useState({});
	const [coursesByStudent, setCoursesByStudent] = useState([]);
	const [allGrades, setAllGrades] = useState([]);

	const { student_id } = useParams();

	const getStudentById = async () => {
		const response = await axios.get(`${BASE_URL}/students/${student_id}`);
		setStudent(response.data);
	};

	const getAllStudentCourses = async () => {
		const response = await axios.get(`${BASE_URL}/student-courses`);
		const allStudentCourses = response.data;
		const coursesByStudentId = allStudentCourses.filter(
			(studentCourse) => student.id === studentCourse.studentId
		);
		setCoursesByStudent(coursesByStudentId);
	};

	const getAllGrades = async () => {
		const response = await axios.get(`${BASE_URL}/grades`);
		setAllGrades(response.data);
	};

	useEffect(() => {
		getStudentById();
		getAllStudentCourses();
		getAllGrades();
	}, [student_id]);

	return (
		<div>
			<h2>{student.name}</h2>
			<p>{student.email}</p>
			{coursesByStudent.map((course) => (
				<div>
					<h3>Class: {course.name}</h3>
					<p>Class Average: {course.grade}</p>
					{allGrades
						.filter((grade) => course.id === grade.studentCourseId)
						.map((grade) => (
							<div>
								<p>{grade.score}</p>
								<p>{grade.letter}</p>
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default StudentStats;

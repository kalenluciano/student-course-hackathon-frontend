import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';

const StudentStats = () => {
	const [student, setStudent] = useState(null);
	const [coursesByStudent, setCoursesByStudent] = useState(null);
	const [allGrades, setAllGrades] = useState(null);
	const [courseDetailsByStudent, setCourseDetailsByStudent] = useState([]);

	const { student_id } = useParams();

	const getStudentById = async () => {
		const response = await axios.get(`${BASE_URL}/students/${student_id}`);
		setStudent(response.data);
	};

	const getAllStudentCourses = async () => {
		const response = await axios.get(`${BASE_URL}/student-courses`);
		const allStudentCourses = response.data;
		const coursesByStudentId = allStudentCourses.filter(
			(studentCourse) => student?.id === studentCourse.studentId
		);
		setCoursesByStudent(coursesByStudentId);
	};

	const getStudentCourseDetails = async () => {
		const response = await axios.get(
			`${BASE_URL}/student-courses/student-details`
		);
		const allStudentCourses = response.data;
		const coursesByStudentId = allStudentCourses.filter(
			(studentCourse) => student.id === studentCourse.id
		);
		setCourseDetailsByStudent(coursesByStudentId[0].enrolled_courses);
	};

	const getAllGrades = async () => {
		const response = await axios.get(`${BASE_URL}/grades/students`);
		setAllGrades(response.data);
	};

	useEffect(() => {
		getStudentById();
	}, [student_id]);

	useEffect(() => {
		if (student) {
			getStudentCourseDetails();
		}
		getAllStudentCourses();

		getAllGrades();
	}, [student]);

	return (
		<div>
			<h2>{student?.name}</h2>
			<p>{student?.email}</p>
			{courseDetailsByStudent?.map((course) => (
				<div key={course.id}>
					<h3>Class: {course.name}</h3>
					{allGrades &&
						allGrades
							.filter(
								(grade) => course.id === grade.studentCourseId
							)
							.map((grade) => (
								<div key={grade.id}>
									<p>Score: {grade.score}</p>
									<p>Letter: {grade.letter}</p>
								</div>
							))}
				</div>
			))}
		</div>
	);
};

export default StudentStats;

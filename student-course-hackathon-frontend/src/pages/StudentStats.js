import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';

const StudentStats = () => {
	const [student, setStudent] = useState(null);
	const [coursesByStudent, setCoursesByStudent] = useState(null);
	const [allGrades, setAllGrades] = useState(null);
	const [courseDetailsByStudent, setCourseDetailsByStudent] = useState([]);
	const [studentGradesForCourse, setStudentGradesForCourse] = useState([]);
	const [studentGPA, setStudentGPA] = useState(null);

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

	const getAllGradesForStudent = () => {
		const studentGradesForCourse = [];
		let totalStudentScore = 0;
		let totalCourses = 0;
		coursesByStudent &&
			coursesByStudent?.map((courseStudent) => {
				const studentGradeCourse = {};
				courseDetailsByStudent
					?.filter((course) => course.id === courseStudent.courseId)
					.map((course) => {
						studentGradeCourse.name = course.name;
						allGrades &&
							allGrades
								.filter(
									(grade) =>
										courseStudent.id ===
										grade.studentCourseId
								)
								.map((grade) => {
									studentGradeCourse.score = grade.score;
									studentGradeCourse.letter = grade.letter;
									studentGradesForCourse.push(
										studentGradeCourse
									);
									totalStudentScore += grade.score;
									totalCourses += 1;
								});
					});
			});
		const studentGPA = totalStudentScore / totalCourses;
		setStudentGradesForCourse(studentGradesForCourse);
		setStudentGPA(studentGPA);
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
		getAllGradesForStudent();
	}, [student]);

	return (
		<div>
			<h2>{student?.name}</h2>
			<p>{student?.email}</p>
			<p>Overall GPA: {studentGPA}</p>
			{studentGradesForCourse.map((studentGradeForCourse, index) => (
				<div key={index}>
					<h3>{studentGradeForCourse.name}</h3>
					<p>Score: {studentGradeForCourse.score}</p>
					<p>Letter: {studentGradeForCourse.letter}</p>
				</div>
			))}
		</div>
	);
};

export default StudentStats;

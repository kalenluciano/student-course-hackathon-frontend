import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import StudentCard from '../components/StudentCard';

const ListOfStudents = () => {
	const { course_id } = useParams();
	const courseId = parseInt(course_id);

	const initialFormState = {
		courseId: courseId,
		studentId: '',
		score: '',
		letter: '',
		studentCourseId: ''
	};

	const [studentCourse, setStudentCourse] = useState([]);
	const [addStudentForm, toggleAddStudentForm] = useState(false);
	const [allStudents, setAllStudents] = useState(null);
	const [addStudentFormState, setAddStudentFormState] =
		useState(initialFormState);

	const getStudentsByCourseId = async () => {
		const response = await axios.get(`${BASE_URL}/student-courses/details`);
		const courses = response.data;
		const course = courses.filter((course) => course.id === courseId);
		setStudentCourse(course);
	};

	const getAllStudents = async () => {
		const response = await axios.get(`${BASE_URL}/students`);
		setAllStudents(response.data);
	};

	const addStudentButton = () => {
		toggleAddStudentForm(!addStudentForm);
	};

	const handleChange = (e) => {
		setAddStudentFormState({
			...addStudentFormState,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const studentCourseSubmission = {
			courseId: parseInt(addStudentFormState.courseId),
			studentId: parseInt(addStudentFormState.studentId)
		};
		const studentCourse = await axios.post(
			`${BASE_URL}/student-courses`,
			studentCourseSubmission
		);
		switch (parseInt(addStudentFormState.score)) {
			case 0:
				addStudentFormState.letter = 'F';
				break;
			case 1:
				addStudentFormState.letter = 'D';
				break;
			case 2:
				addStudentFormState.letter = 'C';
				break;
			case 3:
				addStudentFormState.letter = 'B';
				break;
			case 4:
				addStudentFormState.letter = 'A';
				break;
			default:
				break;
		}
		const gradeSubmission = {
			score: parseInt(addStudentFormState.score),
			letter: addStudentFormState.letter,
			studentCourseId: parseInt(studentCourse.data[0][0].id)
		};
		const studentGrade = await axios.post(
			`${BASE_URL}/grades/${addStudentFormState.studentId}/new`,
			gradeSubmission
		);
		setAddStudentFormState(initialFormState);
		toggleAddStudentForm(!addStudentForm);
	};

	useEffect(() => {
		getStudentsByCourseId();
		getAllStudents();
	}, [course_id, addStudentButton]);

	return (
		<div>
			<h1>{studentCourse[0]?.name}</h1>
			{!addStudentForm && (
				<button onClick={addStudentButton}>Add Student</button>
			)}
			{addStudentForm && (
				<form onSubmit={handleSubmit}>
					<label htmlFor="studentId">Student: </label>
					<select
						id="studentId"
						name="studentId"
						onChange={handleChange}
						value={addStudentFormState.studentId}
					>
						<option defaultValue="Select a student">
							Select a student
						</option>
						{allStudents?.map((student) => (
							<option value={student.id} key={student.id}>
								{student.name}
							</option>
						))}
					</select>
					<label htmlFor="score">Score: </label>
					<select
						id="score"
						name="score"
						onChange={handleChange}
						value={addStudentFormState.score}
					>
						<option defaultValue="Select a score">
							Select a score
						</option>
						{[0, 1, 2, 3, 4].map((number) => (
							<option value={number} key={number}>
								{number}
							</option>
						))}
					</select>
					<button>Add Student</button>
				</form>
			)}
			{studentCourse &&
				studentCourse[0]?.student_courses.map((student) => (
					<StudentCard key={student.id} student={student} />
				))}
		</div>
	);
};

export default ListOfStudents;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Course from './page/Course';
import ListOfStudents from './page/ListOfStudents';
import StudentStats from './page/StudentStats';
import AddStudentForm from './page/AddStudentForm';
import AddCourseForm from './page/AddCourseForm';
import Nav from './components/Nav';

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<Course />} />
				<Route
					path="/students/:course_id"
					element={<ListOfStudents />}
				/>
				<Route
					path="/student-stats/:student_id"
					element={<StudentStats />}
				/>
				<Route path="/add-student" element={<AddStudentForm />} />
				<Route path="/add-course" element={<AddCourseForm />} />
			</Routes>
		</div>
	);
}

export default App;

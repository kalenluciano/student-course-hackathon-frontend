import './App.css';
import { Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import ListOfStudents from './pages/ListOfStudents';
import StudentStats from './pages/StudentStats';
import AddStudentForm from './pages/AddStudentForm';
import AddCourseForm from './pages/AddCourseForm';
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

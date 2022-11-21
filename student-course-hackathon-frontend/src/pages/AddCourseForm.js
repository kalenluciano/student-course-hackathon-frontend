import { useState, useEffect } from 'react';
import { BASE_URL } from '../globals';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCourseForm = () => {
	const initialState = {
		name: '',
		grade: ''
	};
	const [formState, setFormState] = useState(initialState);

	let navigate = useNavigate();

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post(`${BASE_URL}/courses`, formState);
		const courseId = response.data.id;
		setFormState(initialState);
		navigate(`/students/${courseId}`);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Course Name: </label>
				<input
					name="name"
					value={formState.name}
					type="text"
					onChange={handleChange}
					required
				/>
				<label htmlFor="grade">Course Grade Level: </label>
				<input
					name="grade"
					value={formState.grade}
					type="number"
					onChange={handleChange}
					required
				/>
				<button>Add Course</button>
			</form>
		</div>
	);
};

export default AddCourseForm;

import { useState, useEffect } from 'react';
import { BASE_URL } from '../globals';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudentForm = () => {
	const initialState = {
		name: '',
		email: ''
	};
	const [formState, setFormState] = useState(initialState);

	let navigate = useNavigate();

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post(`${BASE_URL}/students`, formState);
		const studentId = response.data.id;
		setFormState(initialState);
		navigate(`/student-stats/${studentId}`);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Student Name: </label>
				<input
					name="name"
					value={formState.name}
					type="text"
					onChange={handleChange}
					required
				/>
				<label htmlFor="email">Student Email: </label>
				<input
					name="email"
					value={formState.email}
					type="text"
					onChange={handleChange}
				/>
				<button>Add Student</button>
			</form>
		</div>
	);
};

export default AddStudentForm;

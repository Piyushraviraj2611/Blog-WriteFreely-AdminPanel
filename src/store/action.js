import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = 'http://localhost:4848/api/v1';

export const registerUser = createAsyncThunk(
	'registerUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/register`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	'loginUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/login`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

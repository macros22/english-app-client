import axios from 'axios';
import { AUTH_ME_URL, BASE_URL, LOGOUT_URL, SIGN_IN_URL } from 'constants/url';

export const login = async (email: string, password: string) => {
	try {
		const res = await axios.post(
			SIGN_IN_URL,
			{
				email,
				password,
			},
			{ withCredentials: true }
		);
		return res.data.data.accessToken;
	} catch (error) {
		console.log(error);
	}

	return '';
};

export const getUser = async () => {
	try {
		let res = await axios.get(AUTH_ME_URL, { withCredentials: true });

		return res.data.data;
	} catch (error) {
		// console.log(error);
		throw error;
	}
};

export const logout = async () => {
	try {
		await axios.delete(LOGOUT_URL, { withCredentials: true });
	} catch (error) {
		console.log(error);
	}
};

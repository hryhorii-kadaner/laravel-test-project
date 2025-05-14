import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, } from 'axios';

export const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const $api = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: backendUrl,
});

export const request = async (options: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<unknown, unknown>) => response?.data;
	const onError = (error: AxiosError<unknown, unknown>) => Promise.reject(error);
	return $api(options).then(onSuccess).catch(onError);
};

export default $api;
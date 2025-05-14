import {
	useQuery,
	useMutation,
	useQueryClient,
	keepPreviousData,
	UseMutationOptions,
	UseQueryOptions,
	QueryFunction,
	QueryKey,
	MutationFunction,
} from '@tanstack/react-query';

export const useApiGet = <T>(
	key: Array<any>,
	fn: QueryFunction<T, QueryKey, never>,
	options?: UseQueryOptions<T>,
) =>
	useQuery<T>({
		queryKey: key,
		queryFn: fn,
		placeholderData: keepPreviousData,
		...options,
	});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useApiSend = <T>(
	fn: MutationFunction<any, any>,
	success?: any,
	error?: any,
	invalidateKey?: any,
	options?: UseMutationOptions<any, Error, T, unknown>,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: fn,
		onSuccess: (data?: any) => {
			if (invalidateKey) {
				invalidateKey.forEach((key: any) => {
					queryClient.invalidateQueries(key);
					console.log(key);
				});
			}
			if (typeof success === 'function') {
				success(data);
			}
		},
		onError: error,
		retry: 2,
		...options,
	});
};

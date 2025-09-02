import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface UseNoteMutationOptions<T> {
  mutationFn: (variables: T) => Promise<any>;
  queryKey: string[];
  successMsg?: string;
  errorMsg?: string;
}

export function useNoteMutation<T = any>({ mutationFn, queryKey, successMsg, errorMsg }: UseNoteMutationOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (successMsg) toast.success(successMsg);
    },
    onError: () => {
      if (errorMsg) toast.error(errorMsg);
    }
  });
}

import { UseAuthMessageParams, UseAuthMessageReturn } from './types';
import axios from 'axios';
import { useCallback, useState } from 'react';

export const useAuthMessage = () => {
  const [error, setError] = useState();
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const getMessage = useCallback((params: UseAuthMessageParams) => {
    try {
      return axiosFetcher('Auth/requestMessage', params) as Promise<UseAuthMessageReturn>;
    } catch (e) {
      setError(e);
      return null;
    }
  }, []);

  return {
    getMessage,
    error,
  };
};

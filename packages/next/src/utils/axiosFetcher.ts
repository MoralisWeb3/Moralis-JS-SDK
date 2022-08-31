import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosFetcher = async (endpoint: string, params: any) => {
  const result = await axios.get(`/api${endpoint}`, params);
  return result.data;
};

export default axiosFetcher;

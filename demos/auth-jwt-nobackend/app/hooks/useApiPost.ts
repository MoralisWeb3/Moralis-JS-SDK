import axios from 'axios';

const useApiPost = () => {
  const apiPost = async (endpoint: string, params: any) => {
    const result = await axios.post(`/api${endpoint}`, params, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return result.data;
  };
  return apiPost;
};

export default useApiPost;

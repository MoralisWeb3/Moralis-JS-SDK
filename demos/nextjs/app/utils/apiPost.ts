import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiPost = async (endpoint: string, params: any) => {
  const result = await axios.post(`/api${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
  return result.data;
};

export default apiPost;

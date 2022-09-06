import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_ROOT

export class Api {
  private static getHeaders() {
    return {
      'content-type': 'application/json',
    };
  }
  static async apiPost<Body, Result extends unknown>(endpoint: string, body: Body) {
    const { data } = await axios.post(`${API_ROOT}/${endpoint}`, body, {
      headers: this.getHeaders(),
    });

    return data as Result;
  }

  static async apiGet<Body, Result extends unknown>(endpoint: string, params?: Body) {
    const { data } = await axios.get(`${API_ROOT}/${endpoint}`, {
      headers: this.getHeaders(),
    });

    return data as Result;
  }

}

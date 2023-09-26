import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products`;

export const hatsApi = {
  fetchHats: () => axios.get(BASE_URL),
  createHat: (newData: FormData) =>
    axios.post(`${BASE_URL}`, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateHat: (_id: string, newData: FormData) =>
    axios.put(`${BASE_URL}/${_id}`, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteHat: (_id: string) => axios.delete(`${BASE_URL}/${_id}`),
};

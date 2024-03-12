import axios from "axios";

const baseUrl = "/api/persons";
const getAll = () => {
  const data = axios.get(baseUrl);
  return data;
};

const create = (id, name, phone) => {
  const result = axios.post(`${baseUrl}/addperson`, { id: id, name: name, number: phone });
  return result;
};

const update = (id, newContact) => {
  const result = axios.put(`${baseUrl}/${id}`, newContact);
  return result;
};
const deleteContact = (id) => {
  const result = axios.delete(`${baseUrl}/${id}`);
  return result;
};

export default {
  getAll,
  create,
  update,
  deleteContact,
};

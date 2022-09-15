import axios from "axios";

export const instance = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 60000,
});

export function getPeopleById(id: number) {
  return instance.get(`people/${id}`);
}

export function getPeopleBySearch(value: string) {
  return instance.get(`people/?search=${value}`);
}

export function getByUrl(url: string) {
  return axios.get(url);
}

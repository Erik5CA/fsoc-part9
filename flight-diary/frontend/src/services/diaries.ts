import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addNewEntriy = async (entry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry);
  return response.data;
};

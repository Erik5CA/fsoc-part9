import patients from "../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NoSesitivePatient,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

const getNoSensitivePatients = (): NoSesitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patientFound = patients.find((patient) => patient.id === id);
  return patientFound;
};

const addNewPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    ...entry,
    id,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addNewEntryToPatientById = (
  id: string,
  object: EntryWithoutId
): Entry => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    const newEntry = {
      ...object,
      id: uuid(),
    };
    patient.entries.push(newEntry);
    return newEntry;
  }
  throw new Error("Patient not found");
};

export default {
  getNoSensitivePatients,
  addNewPatient,
  getPatientById,
  addNewEntryToPatientById,
};

import {
  Diagnoses,
  EntryBaseWithoutId,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseString = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing data " + data);
  }

  return data;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnoses["code"]> => {
  if (
    !Array.isArray(diagnosisCodes) ||
    diagnosisCodes.map((v) => isString(v)).includes(false)
  ) {
    // we will just trust the data to be in correct form
    throw new Error("Incorrect or missing Diagnosis Codes: " + diagnosisCodes);
  }

  return diagnosisCodes as Array<Diagnoses["code"]>;
};

const parseHealthCheckRating = (number: unknown): HealthCheckRating => {
  if (!isNumber(number) || !isHealthCheckRating(number)) {
    throw new Error("Incorrect or missing Healt Check Raiting: " + number);
  }
  return number;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "dateOfBirth" in object &&
    "gender" in object &&
    "name" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newPatient: NewPatient = {
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      ssn: parseString(object.ssn),
    };

    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const newEntry: EntryBaseWithoutId = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const newEntryHealtCheck: EntryWithoutId = {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type: object.type,
      };
      return newEntryHealtCheck;
    }
    if (object.type === "Hospital" && "discharge" in object) {
      if (object.discharge && typeof object.discharge === "object") {
        if ("date" in object.discharge && "criteria" in object.discharge) {
          const newHospitalEntry: EntryWithoutId = {
            ...newEntry,
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseString(object.discharge.criteria),
            },
            type: object.type,
          };
          return newHospitalEntry;
        }
      }
    }
    if (
      object.type === "OccupationalHealthcare" &&
      "employerName" in object &&
      "sickLeave" in object
    ) {
      if (
        object.sickLeave &&
        typeof object.sickLeave === "object" &&
        "startDate" in object.sickLeave &&
        "endDate" in object.sickLeave
      ) {
        const newOccupationalHealthcareEntry: EntryWithoutId = {
          ...newEntry,
          employerName: parseString(object.employerName),
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
          type: object.type,
        };
        return newOccupationalHealthcareEntry;
      }
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;

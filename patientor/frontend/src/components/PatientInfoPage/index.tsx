import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Entry, Patient } from "../../types";
import { Female, Male } from "@mui/icons-material";
import { EntryDetails } from "./EntryDetails";
import { Box, Button } from "@mui/material";
import { AddEntryForm } from "./AddEntryForm";

export const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [viewForm, setViewForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchDataPatient = async () => {
        const patient = await patientService.getPatientById(id);
        setPatient(patient);
      };

      const fetchDiagnoses = async () => {
        const diagnoses = await diagnosesService.getAll();
        setDiagnoses(diagnoses);
      };

      fetchDataPatient();
      fetchDiagnoses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeForm = () => {
    setViewForm(false);
  };

  const onCreateEntry = (entry: Entry) => {
    const entries = patient?.entries;
    if (entries) {
      const newEntries = entries?.concat(entry);
      setPatient({ ...patient, entries: newEntries });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>{patient?.name}</h2>
        {patient?.gender === "male" ? <Male /> : <Female />}
      </div>
      <p>SSN: {patient?.ssn}</p>
      <p>Ocupation: {patient?.occupation}</p>

      <h3>Entries</h3>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        style={{ marginBottom: "1em" }}
      >
        {patient?.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Box>
      {viewForm ? (
        <AddEntryForm
          diagnoses={diagnoses}
          closeForm={closeForm}
          id={id}
          onCreateEntry={onCreateEntry}
        />
      ) : (
        <Button variant="contained" onClick={() => setViewForm(true)}>
          Add New Entry
        </Button>
      )}
    </div>
  );
};

{
  /* <div key={entry.id}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {" "}
                  {code} {diagnoses?.find((diag) => diag.code === code)?.name}
                </li>
              ))}
            </ul>
          </div> */
}

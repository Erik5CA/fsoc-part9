import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Diagnosis,
  Entry,
  EntryBaseWithoutId,
  EntryWithoutId,
  HealthCheckRating,
  TypesEntries,
} from "../../types";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[] | undefined;
  closeForm: () => void;
  id: string | undefined;
  onCreateEntry: (entry: Entry) => void;
}

export const AddEntryForm = ({
  diagnoses,
  closeForm,
  id,
  onCreateEntry,
}: Props) => {
  const [diagSelected, setDiagSelected] = useState<Array<Diagnosis["code"]>>(
    []
  );
  const [type, setType] = useState<TypesEntries>(TypesEntries.HealthCheck);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!diagSelected.includes(event.target.value)) {
      setDiagSelected([...diagSelected, event.target.value]);
    }
  };

  const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = Object.values(TypesEntries).find(
      (v) => v.toString() === event.target.value
    );
    if (type) {
      setType(type);
    }
  };

  const onHealtCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = Object.values(HealthCheckRating)
      .slice(4)
      .find((v) => v === event.target.value);
    if (type && typeof type !== "string") {
      setHealthCheckRating(type);
    }
  };

  // const reset = () => {
  //   setDescription("");
  //   setDate("");
  //   setDiagSelected([]);
  //   setSpecialist("");
  // };

  const handleSubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      let newEntry: EntryWithoutId;
      const newBaseEntry: EntryBaseWithoutId = {
        description,
        date,
        specialist,
        diagnosisCodes: diagSelected,
      };
      if (type === TypesEntries.HealthCheck) {
        const newEntryHealthCheck: EntryWithoutId = {
          ...newBaseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        newEntry = newEntryHealthCheck;
        if (id) {
          const res = await patientService.createEntry(id, newEntry);
          onCreateEntry(res);
          closeForm();
        }
      }
      if (type === TypesEntries.Hospital) {
        const newEntryHospital: EntryWithoutId = {
          ...newBaseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria,
          },
        };
        newEntry = newEntryHospital;
        if (id) {
          const res = await patientService.createEntry(id, newEntry);
          onCreateEntry(res);
          closeForm();
        }
      }
      if (type === TypesEntries.OccupationalHealthcare) {
        const newEntryOccupationalHealthcare: EntryWithoutId = {
          ...newBaseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
        };
        newEntry = newEntryOccupationalHealthcare;
        if (id) {
          const res = await patientService.createEntry(id, newEntry);
          onCreateEntry(res);
          closeForm();
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        border={"1px solid black"}
        padding={2}
        borderRadius={2}
      >
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputLabel>Date</InputLabel>
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <InputLabel>Diagnosis Codes</InputLabel>
        <TextField
          label="Diagnosis Codes"
          select
          fullWidth
          // value={"M24.2"}
          onChange={handleSelect}
        >
          {diagnoses?.map((diag) => (
            <MenuItem key={diag.code} value={diag.code}>
              {diag.code}
            </MenuItem>
          ))}
        </TextField>
        {diagSelected.join(", ")}
        <TextField
          label="Type"
          select
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {Object.entries(TypesEntries).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        {type === TypesEntries.HealthCheck && (
          <>
            <TextField
              select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealtCheckChange}
            >
              {Object.entries(HealthCheckRating)
                .slice(4)
                .map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
            </TextField>
          </>
        )}
        {type === TypesEntries.Hospital && (
          <>
            <InputLabel>Discharge</InputLabel>
            <InputLabel>Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
            />
          </>
        )}
        {type === TypesEntries.OccupationalHealthcare && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <InputLabel>Sick Leave</InputLabel>
            <InputLabel>Start Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <InputLabel>End Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <div>
          <Button
            variant="contained"
            color="warning"
            type="button"
            onClick={closeForm}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Entry
          </Button>
        </div>
      </Box>
    </form>
  );
};

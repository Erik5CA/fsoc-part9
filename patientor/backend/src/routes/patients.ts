import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNoSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(400).json({ error: "patient not found" });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientsService.addNewPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const entryAdded = patientsService.addNewEntryToPatientById(id, newEntry);
    res.json(entryAdded);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = " Error: " + error.message;
      res.status(400).json({ error: errorMessage });
    }
  }
});

export default router;

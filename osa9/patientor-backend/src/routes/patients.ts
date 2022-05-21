import express from "express";
import patientService from "../services/patientSerivce";
import { Entry } from "../types";
import { toNewPatientEntry, toNewEntry } from "../utils";
import { v4 as uuidv4 } from "uuid";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: "Patient id not found" });
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const entry: Entry = toNewEntry({ ...req.body, id: uuidv4() });

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = patientService.addEntryForId(entry, id);
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default patientRouter;

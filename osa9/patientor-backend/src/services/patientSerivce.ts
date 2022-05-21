import patients from "../../data/patients";
import type { Entry, Patient, PublicPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): PublicPatient[] => {
  //   console.log(patients);
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined =>
  patients.find((patient) => patient.id === id);

const addPatient = (newPatient: Omit<Patient, "id">) => {
  const addedPatient = { ...newPatient, id: uuidv4() };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntryForId = (entry: Entry, id: string): Patient | undefined => {
  patients.map((patient) =>
    patient.id === id
      ? { ...patient, entries: [...patient.entries, entry] }
      : patient
  );
  return patients.find((patient) => patient.id === id);
};

const patientService = {
  getPatients,
  addPatient,
  getPatientById,
  addEntryForId,
};
export default patientService;

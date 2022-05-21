import { HealthCheckRating, Entry, Gender, Patient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (name: unknown, what: string): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing ${what}`);
  }
  return name;
};

const parseDOB = (dob: unknown): string => {
  const isoDateRegex = /\d{4}-\d{2}-\d{2}/; // good enough
  if (!dob || !isString(dob) || !isoDateRegex.test(dob)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return dob;
};

const parseGender = (gender: unknown): Gender => {
  const genderStrings = ["male", "female", "other"];
  if (!gender || !isString(gender) || !genderStrings.includes(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  switch (true) {
    case gender === "male":
      return Gender.Male;
    case gender === "female":
      return Gender.Female;
    default:
      return Gender.Other;
  }
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): Omit<Patient, "id"> => {
  const newPatient = {
    name: parseString(name, "name"),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: [],
  };

  return newPatient;
};
// interface BaseHealthcareEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<DiagnoseEntry["code"]>;
// }

// export interface OccupationalHealthcareEntry extends BaseHealthcareEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: { startDate: string; endDate: string };
// }

// export interface HospitalEntry extends BaseHealthcareEntry {
//   type: "Hospital";
//   discharge: {
//     date: string;
//     criteria: string;
//   };
// }

// export interface HealthCheckEntry extends BaseHealthcareEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }
// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };
const isStringArray = (arr: unknown): arr is string[] => {
  return Array.isArray(arr) && arr.every((elem) => isString(elem));
};

// const parseDiagnosisCodes = (
//   diagnosisCodes: unknown
// ): Array<DiagnoseEntry["code"]> | undefined => {
//   if (!diagnosisCodes) {
//     return undefined;
//   }
//   if (!isStringArray(diagnosisCodes))
//    {
//     throw new Error("Incorrect diagnosis codes");
//   }
//   return diagnosisCodes;
// };
// {
//   id,
//   description,
//   date,
//   specialist,
//   diagnosisCodes,
//   type,
//   employerName,
//   sickLeave,
//   discharge,
//   healthCheckRating,
// }

const parseEntryType = (type: unknown): string => {
  const genderStrings = ["OccupationalHealthcare", "Hospital", "HealthCheck"];
  if (!type || !isString(type) || !genderStrings.includes(type)) {
    throw new Error("Incorrect or missing type");
  }

  return type;
};

const parseHealth = (health: unknown): HealthCheckRating => {
  const healthValues = [0, 1, 2, 3];
  if (
    !health ||
    !(typeof health === "number") ||
    !isNaN(health) ||
    !healthValues.includes(health)
  ) {
    throw new Error("Incorrect or missing gender");
  }

  switch (health) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    default:
      return HealthCheckRating.CriticalRisk;
  }
};

const parseDischarge = ({
  date,
  criteria,
}: {
  date: unknown;
  criteria: unknown;
}): { date: string; criteria: string } => {
  if (!date || !criteria || !isString(date) || !isString(criteria)) {
    throw new Error("Incorrect discharge information");
  }

  return { date, criteria };
};

const parseSick = ({
  startDate,
  endDate,
}: {
  startDate: unknown;
  endDate: unknown;
}): { startDate: string; endDate: string } => {
  if (!startDate || !endDate || !isString(startDate) || !isString(endDate)) {
    throw new Error("Incorrect discharge information");
  }

  return { startDate, endDate };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): Entry => {
  const enableCodes =
    entry.diagnosisCodes && isStringArray(entry.diagnosisCodes) ? true : false;

  const baseEntry = {
    id: parseString(entry.id, "id"),
    description: parseString(entry.description, "description"),
    date: parseString(entry.date, "date"),
    specialist: parseString(entry.specialist, "specialist"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...(enableCodes && { diagnosisCodes: entry.diagnosisCodes }),
  };

  const type = parseEntryType(entry.type);

  switch (true) {
    case type === "HealthCheck":
      return {
        ...baseEntry,
        healthCheckRating: parseHealth(entry.healthCheckRating),
        type: "HealthCheck",
      };
    case type === "Hospital":
      return {
        ...baseEntry,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        discharge: parseDischarge(entry.discharge),
        type: "Hospital",
      };
    default:
      const enableSickLeave = entry.sickLeave ? true : false;
      return {
        ...baseEntry,
        employerName: parseString(entry.employerName, "employer name"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...(enableSickLeave && { sickLeave: parseSick(entry.sickLeave) }),
        type: "OccupationalHealthcare",
      };
  }
};

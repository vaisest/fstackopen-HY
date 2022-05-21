import diagnoses from "../../data/diagnoses";
import type { DiagnoseEntry } from "../types";

export const getDiagnoses = (): DiagnoseEntry[] => diagnoses;

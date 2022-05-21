import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (
    typeof req.query.height !== "string" ||
    typeof req.query.weight !== "string"
  ) {
    res.status(400).json({ error: "malformatted paramters" });
    return;
  }

  const height = parseInt(req.query.height, 10);
  const weight = parseInt(req.query.weight, 10);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted paramters" });
    return;
  }

  res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((item) => typeof item !== "number" || isNaN(item)) ||
    typeof target !== "number" ||
    isNaN(target)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(daily_exercises, target));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

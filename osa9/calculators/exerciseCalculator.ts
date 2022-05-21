interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseOptions {
  target: number;
  hoursEachDay: number[];
}

const parseArgs = (args: string[]): ExerciseOptions => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = parseFloat(args[2]);
  const hoursEachDay = args.slice(3).map((arg) => parseFloat(arg));
  console.log(hoursEachDay);

  if (isNaN(target) || hoursEachDay.some(isNaN))
    throw new Error("Provided values were not numbers!");

  return { target, hoursEachDay };
};

const calculateExercises = (
  hoursEachDay: number[],
  target: number
): ExerciseResult => {
  const periodLength = hoursEachDay.length;
  const trainingDays = hoursEachDay.filter((n) => n > 0).length;
  const average =
    hoursEachDay.reduce((last, curr) => last + curr, 0) / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;
  switch (true) {
    case average < target - 0.5:
      rating = 1;
      ratingDescription = "not quite enough";
      break;
    case average <= target:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    default:
      rating = 3;
      ratingDescription = "good enough";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  const { target, hoursEachDay } = parseArgs(process.argv);
  console.log(calculateExercises(hoursEachDay, target));
}

export default calculateExercises;

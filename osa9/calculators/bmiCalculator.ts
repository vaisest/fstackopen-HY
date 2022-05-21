type Centimeter = number;

type Kilogram = number;

interface BmiOptions {
  height: Centimeter;
  weight: Kilogram;
}

const parseBmiArgs = (args: string[]): BmiOptions => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = parseInt(args[2], 10);
  const weight = parseInt(args[3], 10);

  if (isNaN(height) || isNaN(weight))
    throw new Error("Provided values were not numbers!");

  return { height, weight };
};

const calculateBmi = (length: Centimeter, weight: Kilogram): string => {
  const lengthMeters = length / 100;
  const bmi = weight / (lengthMeters * lengthMeters);
  switch (true) {
    // https://en.wikipedia.org/wiki/Body_mass_index#Categories
    case bmi < 16:
      return "Underweight (severe thinness)";
    case bmi <= 16.9:
      return "Underweight (moderate thinness)";
    case bmi <= 18.4:
      return "Underweight (mild thinness)";
    case bmi <= 24.9:
      return "Normal (healthy weight)";
    case bmi <= 29.9:
      return "Overweight";
    case bmi <= 34.9:
      return "Obese (class I)";
    case bmi <= 39.9:
      return "Obese (class II)";
    default:
      return "Obese (class III)";
  }
};

if (require.main === module) {
  const { height: personLength, weight: personWeight } = parseBmiArgs(
    process.argv
  );
  console.log(calculateBmi(personLength, personWeight));
}

export default calculateBmi;

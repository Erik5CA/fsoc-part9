interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseArgumentsExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(2).forEach((value) => {
    if (isNaN(Number(value))) {
      throw new Error("Provided values were not numbers!");
    }
  });

  return {
    dailyExerciseHours: args.slice(3).map((value) => Number(value)),
    target: Number(args[2]),
  };
};

export function calculateExercises(
  dailyExerciseHours: number[],
  target: number
): Result {
  let rating: number;
  let ratingDescription: string;
  const average =
    dailyExerciseHours.reduce((acc, hour) => (acc += hour), 0) /
    dailyExerciseHours.length;
  const success = average >= target ? true : false;
  if (average < target / 3) {
    rating = 1;
    ratingDescription = "You met less than 30% of your targett";
  } else if (average >= target / 3 && average < (target / 3) * 2) {
    rating = 2;
    ratingDescription =
      "You met more than 33% of your target but less than 66%.";
  } else {
    rating = 3;
    ratingDescription = "You met more than 66% of your objective";
  }
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((hours) => hours > 0).length,
    target,
    success,
    average,
    rating,
    ratingDescription,
  };
}
try {
  const { dailyExerciseHours, target } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

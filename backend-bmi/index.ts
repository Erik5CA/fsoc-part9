import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) return res.json({ error: "malformatted parameters" });
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    return res.json({ error: "malformatted parameters" });
  res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
  return;
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)
    return res.json({ error: "parameters missing" });
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises))
    return res.json({ error: "malformatted parameters" });
  const verify = daily_exercises.map((value) => isNaN(Number(value)));
  if (verify.includes(true))
    return res.json({ error: "malformatted parameters" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const results = calculateExercises(daily_exercises, Number(target));
  return res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

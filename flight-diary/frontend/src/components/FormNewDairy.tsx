import { SyntheticEvent, useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

const getWeather = (param: string) => {
  const weather = Object.values(Weather).find((value) => value === param);
  if (weather) {
    return weather;
  }
};

const getVisibility = (param: string) => {
  const visibility = Object.values(Visibility).find((value) => value === param);
  if (visibility) {
    return visibility;
  }
};

export const FormNewDairy = ({
  addNewDairy,
}: {
  addNewDairy: (newDairy: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisivility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const weatherTyped = getWeather(weather);
    const vivibilityTypes = getVisibility(visibility);
    if (!weatherTyped || !vivibilityTypes) return;
    const entryToAdd = {
      date,
      visibility: vivibilityTypes,
      weather: weatherTyped,
      comment,
    };
    console.log(entryToAdd);
    addNewDairy(entryToAdd);
    setDate("");
    setComment("");
    setVisivility("");
    setWeather("");
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          {Object.values(Visibility).map((value) => (
            <>
              <input
                key={value}
                type="radio"
                value={value}
                name="visibility"
                onChange={(e) => setVisivility(e.target.value)}
              />
              <label>{value}</label>
            </>
          ))}
        </div>
        <div>
          weather{" "}
          {Object.values(Weather).map((value) => (
            <>
              <input
                key={value}
                type="radio"
                value={value}
                name="weather"
                onChange={(e) => setWeather(e.target.value)}
              />
              <label>{value}</label>
            </>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

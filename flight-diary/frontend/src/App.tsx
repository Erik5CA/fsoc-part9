import { useEffect, useState } from "react";
import { addNewEntriy, getAll } from "./services/diaries";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { FormNewDairy } from "./components/FormNewDairy";
import axios from "axios";

function App() {
  const [daries, setDaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll();
      setDaries(data);
    };
    fetchData();
  }, []);

  const addNewDairy = async (newDairy: NewDiaryEntry) => {
    try {
      const newEntry = await addNewEntriy(newDairy);
      setDaries([...daries, newEntry]);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data);
      }
    }
  };
  return (
    <main>
      <FormNewDairy addNewDairy={addNewDairy} />
      {error && <p className="error">{error}</p>}

      <h1>Dairy Entries</h1>
      {daries.map((dairy) => (
        <div key={dairy.id}>
          <h3>{dairy.date}</h3>
          <p>Visivilty: {dairy.visibility}</p>
          <p>Weather: {dairy.weather}</p>
        </div>
      ))}
    </main>
  );
}

export default App;

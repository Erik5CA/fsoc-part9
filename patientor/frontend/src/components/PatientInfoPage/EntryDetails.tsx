import { Diagnosis, Entry } from "../../types";
import { HealtCheck } from "./HealtCheck";
import { Hospital } from "./Hospital";
import { OccupationalHealthcare } from "./OccupationalHealthcare";

export const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  switch (entry.type) {
    case "HealthCheck": {
      return <HealtCheck entry={entry} diagnoses={diagnoses} />;
    }

    case "Hospital": {
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    }

    case "OccupationalHealthcare": {
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    }

    default:
      return <></>;
  }
};

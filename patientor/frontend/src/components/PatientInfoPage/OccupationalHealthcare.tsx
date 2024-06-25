import { Card, CardContent } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Work } from "@mui/icons-material";

export const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <Card>
      <CardContent>
        <div>
          {entry.date}
          <Work />
          {entry.employerName}
        </div>
        <p>
          <i>{entry.description}</i>
        </p>
        <p>Deagnose by: {entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {" "}
              {code} {diagnoses?.find((diag) => diag.code === code)?.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

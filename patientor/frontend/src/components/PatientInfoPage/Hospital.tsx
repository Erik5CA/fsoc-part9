import { LocalHospital } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";

export const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <Card>
      <CardContent>
        <div>
          {entry.date}
          <LocalHospital />
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

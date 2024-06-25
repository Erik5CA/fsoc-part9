import { Card, CardContent } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";
import { Favorite, MedicalInformation } from "@mui/icons-material";

export const HealtCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <Card>
      <CardContent>
        <div>
          {entry.date}
          <MedicalInformation />
        </div>
        <p>
          <i>{entry.description}</i>
        </p>
        <Favorite color="warning" />
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

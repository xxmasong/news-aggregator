import { useEffect, useState } from "react";
import { Grid, Typography, FormControlLabel, Radio } from "@mui/material";
import { DateSelection } from "./DateSelection";
import { DateFieldProps } from "./DateField";
import inputFieldContainer from "./Styles";

export interface ConditionalDateFieldProps extends DateFieldProps {
  controlLabel1: string;
  controlLabel2: string;
  filled?: boolean;
  contemporary: boolean;
  setContemporary: (contemporary: boolean) => void;
  update?: (value: boolean) => void;
  readOnly: boolean;
}

function ConditionalDateField({
  controlLabel1,
  controlLabel2,
  label,
  breakable,
  lined,
  filled,
  contemporary,
  setContemporary,
  update,
  readOnly,
  ...props
}: ConditionalDateFieldProps) {
  useEffect(() => {
    setContemporary(!filled);
  }, [filled]);

  const [current, setCurrent] = useState(false);

  return (
    <Grid
      container
      item
      xs={12}
      sx={inputFieldContainer}
      className={lined ? "withBorder" : ""}
    >
      <Grid item xs={3} className={breakable ? "breakable" : ""}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid
        item
        xs={9}
        sx={{ display: "flex", flexDirection: "column" }}
        className={breakable ? "breakable" : ""}
      >
        <FormControlLabel
          control={
            <Radio
              size="small"
              checked={contemporary}
              onClick={() => {
                update?.(true);
                setContemporary(true);
              }}
              onChange={() => {
                update?.(true);
                setCurrent(true);
              }}
              disabled={readOnly}
            />
          }
          label={controlLabel1}
        />
        <FormControlLabel
          control={
            <Radio
              size="small"
              checked={!contemporary}
              onClick={() => setContemporary(false)}
              onChange={() => {
                update?.(true);
                setCurrent(false);
              }}
              disabled={readOnly}
            />
          }
          label={controlLabel2}
        />
        <DateSelection
          {...props}
          label={label}
          disabled={contemporary || readOnly}
          showErrors={!contemporary}
          currentDate={current}
        />
      </Grid>
    </Grid>
  );
}

export default ConditionalDateField;

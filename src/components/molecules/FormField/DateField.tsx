import { Grid, Typography } from "@mui/material";

import {DateSelection, DateSelectionProps} from "./DateSelection";
import inputFieldContainer from "./Styles";

export interface DateFieldProps extends DateSelectionProps {
  lined?: boolean;
  breakable?: boolean;
  currentDate?: boolean;
}

export function DateField({ label, lined, breakable, currentDate, ...props }: DateFieldProps) {
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
      <Grid item xs={9} className={breakable ? "breakable" : ""}>
        <DateSelection {...props} label={label} currentDate={false}  />
      </Grid>
    </Grid>
  );
}

export default DateField;

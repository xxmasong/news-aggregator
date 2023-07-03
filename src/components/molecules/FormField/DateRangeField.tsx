import { Grid, Typography } from "@mui/material";
import React from "react";

import DateSelection from "./DateSelection";
import inputFieldContainer from "./Styles";

interface DateRangeFieldProps {
  start_prefix: string;
  end_prefix: string;
  start_period: string;
  end_period?: string | null;
  start_label: string;
  end_label: string;
  disabled?: boolean;
  label: string;
  lined?: boolean;
  breakable?: boolean;
  onChange?: (k: string, v: string) => void;
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export function DateRangeField({
  start_prefix,
  end_prefix,
  start_period,
  end_period,
  start_label,
  end_label,
  label,
  lined,
  breakable,
  disabled,
  onChange,
}: DateRangeFieldProps) {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      sx={inputFieldContainer}
      className={lined ? "withBorder" : ""}
    >
      <Grid item xs={3} className={breakable ? "breakable" : ""}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={9} className={breakable ? "breakable" : ""}>
        <Grid container item spacing={1} direction="column" justifyContent="center">
          <Grid container item alignItems="center" justifyContent="center">
            <Grid item xs={3} >
              <Typography>{start_label}</Typography>
            </Grid>
            <Grid item xs={9}>
              <DateSelection
                label={start_label}
                prefix={start_prefix}
                date={start_period}
                disabled={disabled}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <Typography>{end_label}</Typography>
            </Grid>
            <Grid item xs={9}>
              <DateSelection
                label={end_label}
                prefix={end_prefix}
                date={end_period??''}
                disabled={disabled}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DateRangeField;

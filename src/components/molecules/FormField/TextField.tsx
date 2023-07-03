import React from "react";
import {
  Grid,
  Typography,
  InputAdornment,
  OutlinedInputProps,
} from "@mui/material";

import { Textfield as InputBase } from "../../atoms";
import inputFieldContainer from "./Styles";

export interface TextFieldProps extends Omit<OutlinedInputProps, "onChange"> {
  suffix?: string | React.ReactNode;
  lined?: boolean;
  breakable?: boolean;
  onChange?: (
    v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function TextField({
  label,
  placeholder,
  suffix,
  lined,
  breakable,
  ...props
}: TextFieldProps) {
  const helperText = `Enter ${placeholder || label}`;
  const inputProps = suffix ? (
    <InputAdornment position="start">{suffix}</InputAdornment>
  ) : undefined;

  return (
    <Grid
      container
      item
      xs={12}
      sx={inputFieldContainer}
      className={lined ? "withBorder" : ""}
    >
      <Grid item xs={3} className={breakable ? "breakable" : ""}>
        {label && <Typography>{label}</Typography>}
      </Grid>
      <Grid item xs={9} className={breakable ? "breakable" : ""}>
        <InputBase
          {...props}
          endAdornment={inputProps}
          placeholder={helperText}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default TextField;

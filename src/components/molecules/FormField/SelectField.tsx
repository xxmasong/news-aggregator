import { Grid, NativeSelectProps, Typography } from "@mui/material";

import { Selection, SelectionType } from "../../atoms";
import inputFieldContainer from "./Styles";

export interface SelectFieldProps extends Omit<NativeSelectProps, "onChange"> {
  label: string;
  selection?: SelectionType[] | string[] | number[];
  lined?: boolean;
  breakable?: boolean;
  onChange?: (v: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
  label,
  selection,
  placeholder,
  lined,
  breakable,
  ...props
}: SelectFieldProps) {
  const helperText = placeholder || "未選択";

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
        <Selection {...props} label={helperText} selection={selection} />
      </Grid>
    </Grid>
  );
}

export default SelectField;

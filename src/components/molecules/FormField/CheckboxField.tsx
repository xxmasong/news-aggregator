import {
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";

import { arrayIsEmpty } from "../../utils/Functions";
import inputFieldContainer from "./Styles";

interface CheckboxFieldProps
  extends Omit<FormControlLabelProps, "onChange" | "control"> {
  label: string;
  values: boolean[];
  checkboxLabels: string[];
  noBold?: boolean;
  lined?: boolean;
  onChange?: (v: boolean[]) => void;
  name?: string;
}

function CheckboxField({
  label,
  values,
  checkboxLabels,
  noBold,
  lined,
  onChange,
  disabled,
  name,
}: CheckboxFieldProps) {
  const handleCheck = (i: number, v: boolean) => {
    const temp = [...values!];
    temp[i] = v;
    onChange!(temp);
  };
  return (
    <Grid
      container
      item
      xs={12}
      sx={inputFieldContainer}
      className={lined ? "withBorder" : ""}
    >
      <Grid item xs={3} className={noBold ? "no-bold" : ""}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        <FormGroup row>
          {!arrayIsEmpty(checkboxLabels) &&
            !arrayIsEmpty(values) &&
            checkboxLabels!.length === values!.length &&
            checkboxLabels!.map((s, i) => (
              <FormControlLabel
                key={"checkbox-key-" + i}
                control={
                  <Checkbox
                    checked={values![i]}
                    name={name ? name + "__" + i : undefined}
                    size="small"
                    onChange={(_e, c: boolean) => handleCheck(i, c)}
                  />
                }
                label={s}
                disabled={disabled}
              />
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default CheckboxField;

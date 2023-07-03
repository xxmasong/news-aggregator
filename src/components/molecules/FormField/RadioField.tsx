import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  RadioGroupProps,
} from "@mui/material";

import { SelectionType } from "../../atoms";
import inputFieldContainer, { RadioFieldStyle } from "./Styles";

interface RadioFieldProps extends RadioGroupProps {
  label: string;
  selection: SelectionType[] | string[] | number[];
  lined?: boolean;
  breakable?: boolean;
  disabled?: boolean;
}

const OptionFactory = ({
  selection,
  disabled,
}: {
  selection: SelectionType[] | number[] | string[];
  disabled?: boolean;
}) => {
  const transformed: SelectionType[] = selection.map((a, i) =>
    a.hasOwnProperty("id")
      ? (a as SelectionType)
      : ({ id: i + 1, name: a } as SelectionType)
  );
  return (
    <>
      {transformed.map(({ id, name }) => (
        <FormControlLabel
          key={"radio-" + name}
          value={id}
          control={<Radio />}
          label={name}
          disabled={disabled}
        />
      ))}
    </>
  );
};

function RadioField({
  label,
  selection,
  breakable,
  lined,
  disabled,
  ...props
}: RadioFieldProps) {
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
        container
        item
        xs={9}
        sx={RadioFieldStyle}
        className={breakable ? "breakable" : ""}
      >
        <RadioGroup {...props}>
          <OptionFactory selection={selection} />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default RadioField;

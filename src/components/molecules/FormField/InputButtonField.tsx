import {
  Grid,
  Tooltip,
  Typography,
  Theme,
  ButtonProps,
  TooltipProps,
} from "@mui/material";
import { SxProps } from "@mui/system";

import { Button } from "../../atoms";
import inputFieldContainer from "./Styles";

interface InputButtonFieldProps extends Omit<ButtonProps, "value"> {
  label: string;
  value?: { name: string; id: number };
  breakable?: boolean;
  lined?: boolean;
  name?: string;
  tooltip?: TooltipProps["title"];
  onClear?: () => void;
  readOnly?: boolean;
}

const style: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiButton-root": {
    height: "30px",
    minHeight: "30px",
    maxWidth: "120px",
    marginRight: "10px",
  },
  "& .hoverable": {
    flexGrow: 1,
  },
  "& input[type=number]": {
    display: "none",
  },
};

function InputButtonField({
  label,
  value,
  breakable,
  lined,
  tooltip,
  name,
  onClear,
  readOnly,
  ...props
}: InputButtonFieldProps) {
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
        sx={style}
        className={breakable ? "breakable" : ""}
      >
        {value !== undefined && value?.name !== "" && tooltip && (
          <Tooltip title={tooltip} arrow>
            <Typography className="hoverable">
              <input
                type="number"
                value={value.id}
                onChange={() => null}
                name={name}
              />
              {value.name}
            </Typography>
          </Tooltip>
        )}
        {!readOnly && value?.id !== undefined && value?.id !== -1 && (
          <Button
            variant="outlined"
            onClick={onClear}
            disabled={props.disabled}
          >
            選択を解除
          </Button>
        )}
        {!readOnly && <Button {...props}>選択</Button>}
      </Grid>
    </Grid>
  );
}

export default InputButtonField;

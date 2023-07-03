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

interface ButtonFieldProps extends ButtonProps {
  label: string;
  value?: number | string;
  breakable?: boolean;
  lined?: boolean;
  tooltip?: TooltipProps["title"];
}

const style: SxProps<Theme> = {
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiButton-root": {
    height: "30px",
    minHeight: "30px",
    maxWidth: "120px",
  },
  "& .hoverable": {
    flexGrow: 1,
  },
};

function ButtonField({
  label,
  value,
  breakable,
  lined,
  tooltip,
  ...props
}: ButtonFieldProps) {
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
        {value !== undefined && tooltip && (
          <Tooltip title={tooltip} arrow>
            <Typography className="hoverable">{value}</Typography>
          </Tooltip>
        )}
        <Button {...props}>{value}</Button>
      </Grid>
    </Grid>
  );
}

export default ButtonField;

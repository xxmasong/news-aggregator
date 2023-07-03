import { themedPalette } from "@/lib/styles/themes";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const style: StyleProps = {
  mt: "1rem",
  background: `${themedPalette.primary1}`,
  color: `${themedPalette.button_text}`,
  fontSize: "1rem",
  fontWeight: "bold",
  outline: "none",
  border: "none",
  borderTopRightRadius: "2px",
  borderBottomRightRadius: "2px",
  width: "8rem",
  cursor: "pointer",
  "&:hover, :focus": {
    background: `${themedPalette.primary2}`,
  },
  "&:disabled": {
    background: `${themedPalette.border4}`,
    color: `${themedPalette.text4}`,
    cursor: "default",
  },
};

export type ButtonProps = MUIButtonProps & {
  to?: string;
  loading?: boolean;
  large?: boolean;
};

function Button({ loading, ...props }: ButtonProps) {
  if (loading) {
    const { children, disabled, ...rest } = props;
    return (
      <MUIButton
        fullWidth
        disabled
        {...rest}
        sx={style}
      >
        <CircularProgress size={24.5} color="inherit" />
      </MUIButton>
    );
  }

  return (
    <MUIButton
      fullWidth
      {...{ ...props, component: props.to ? RouterLink : null }}
      sx={style}
    />
  );
}

export default Button;

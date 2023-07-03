import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function LargeButton({
  sx,
  loading,
  ...props
}: ButtonProps & { to?: string; loading?: boolean }) {
  if (loading) {
    const { children, disabled, ...rest } = props;
    return (
      <Button
        fullWidth
        disabled
        sx={{ height: { xs: 40, sm: 60 }, maxWidth: 280, ...sx }}
        {...rest}
      >
        <CircularProgress size={24.5} color="inherit" />
      </Button>
    );
  }

  return (
    <Button
      fullWidth
      sx={{ height: { xs: 40, sm: 60 }, maxWidth: 280, ...sx }}
      {...{ ...props, component: props.to ? RouterLink : null }}
    />
  );
}

export default LargeButton;

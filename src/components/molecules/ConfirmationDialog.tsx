import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@/components/atoms/FormButtons";
import { ButtonTypeLabel } from "@/enums/constants";
import useConfirm from "@/hooks/useConfirm";
import { isCommon } from "@/utils/AlertUtilities";

function ConfirmationDialog() {
  const {
    prompt,
    isOpen = false,
    proceed,
    cancel,
    options = {},
  } = useConfirm();

  const {
    proceedLabel = ButtonTypeLabel.Ok,
    cancelLabel = ButtonTypeLabel.Cancel,
    proceedFn,
    cancelFn,
    maxWidth = "sm",
    accentedTitle,
    moreButtons = [],
  } = options;

  return (
    <Dialog
      open={isOpen}
      maxWidth={maxWidth}
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          fontWeight: "bold",
          pt: 0,
          px: 0,
          "&:before": accentedTitle
            ? {
                content: "''",
                height: 1,
                pr: 1,
                borderLeft: "5px solid #ff4f00",
              }
            : {},
        },
        "& .MuiDialogContent-root ": {
          p: 0,
        },
        "& .accented:before": {
          content: "''",
          height: 1,
          pr: 1,
          borderLeft: "5px solid #ff4f00",
        },
      }}
      PaperProps={{
        sx: {
          p: { xs: 2, sm: 5 },
        },
      }}
    >
      {isCommon(prompt) ? (
        <>
          <DialogTitle>{prompt?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{prompt?.content}</DialogContentText>
          </DialogContent>
        </>
      ) : (
        prompt
      )}
      <DialogActions sx={{ justifyContent: "space-around" }}>
        <Button
          onClick={() => {
            if (cancelFn) cancelFn();
            else if (cancel) cancel();
          }}
          variant="outlined"
          color={cancelLabel === ButtonTypeLabel.Cancel ? "custom2" : "primary"}
        >
          {cancelLabel}
        </Button>
        {moreButtons.map(({ label, fn }) => (
          <Button
            key={label}
            onClick={() => {
              if (fn) fn();
              else if (cancel) cancel();
            }}
            variant="outlined"
          >
            {label}
          </Button>
        ))}
        <Button
          onClick={() => {
            if (proceedFn) proceedFn();
            else if (proceed) proceed();
          }}
          variant="contained"
          color={proceedLabel === ButtonTypeLabel.Delete ? "error" : "primary"}
        >
          {proceedLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;

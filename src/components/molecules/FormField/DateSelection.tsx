import { Box, Theme, Typography, TextField } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";

const style: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  "& .MuiBox-root": {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
};

export interface DateSelectionProps {
  label: string;
  prefix: string;
  date?: string;
  onChange?: (k: string, v: string) => void;
  validationFn?: (v: Date) => void | string[];
  showErrors?: boolean;
  disabled?: boolean;
  currentDate?: boolean;
}

export function DateSelection({
  label,
  prefix,
  date,
  onChange,
  validationFn,
  showErrors = false,
  disabled,
  currentDate,
  ...props
}: DateSelectionProps) {
  const [selection, setSelection] = useState<Date | null>();
  const [error, setError] = useState<string[]>([]);

  const handleChange = (e: any) => {
    if (e instanceof Date) {
      const errors = [];
      if (validationFn) {
        const validate = validationFn?.(e);
        if (validate) {
          errors.push(...validate);
        }
      }
      setError(errors);
      try {
        setSelection(e);
        onChange?.(prefix, `${e?.toISOString().slice(0, 10)}`);
      } catch (e) {
        setSelection(null);
        onChange?.(prefix, `${selection?.toISOString().slice(0, 10)}`);
      }
    }
  };

  useEffect(() => {
    if (date) {
      setSelection(new Date(date));
    } 
    else if (selection === undefined) {
      setSelection(null);
    }
    if (!showErrors) {
      setError([]);
    }
  }, [date, showErrors]);

  return (
    <Box sx={style}>
      <DatePicker
        label={label}
        value={currentDate === false ? selection : null}
        views={["year", "day"]}
        onChange={(e) => handleChange(e)}
        renderInput={(params) => (
          <TextField {...params} helperText={null} size="small" fullWidth onKeyDown={(e) => e.preventDefault()} error={false} />
        )}
        minDate={new Date(1950, 0)}
        maxDate={new Date()}
        disabled={disabled}
        {...props}
      />
      {showErrors && error.map((e, i) => (
        <React.Fragment key={"error-" + i}>
          <Typography variant="overline" color="#ff4f00">
            {e}
          </Typography>
          <br />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default DateSelection;

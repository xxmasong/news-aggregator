import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import React, { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";


function InputBase({
  fullWidth,
  placeholder,
  label,
  type,
  endAdornment,
  ...props
}: OutlinedInputProps) {
  const [hidden, setHidden] = useState(type === "password");
  const inputProps =
    type === "password" ? (
      <InputAdornment position="start">
        <IconButton onClick={() => setHidden(!hidden)} edge="end">
          {hidden ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ) : (
      endAdornment
    );

  const dynamicType = hidden ? "password" : "text";
  return (
    <FormControl
      fullWidth={fullWidth}
    >
      <OutlinedInput
        {...props}
        endAdornment={inputProps}
        type={type === "password" ? dynamicType : type}
        placeholder={placeholder || (label as string)}
        fullWidth
      />
    </FormControl>
  );
}

export default InputBase;

export const MemoizedInputBase = React.memo(InputBase);

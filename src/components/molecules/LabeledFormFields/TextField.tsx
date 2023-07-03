import {
  TextField as AtomTF,
  TextFieldProps,
} from "@/components/atoms/FormFields";
import Labeler from "../FormField/Labeler";
import { InputAdornment } from "@mui/material";
import React from "react";

function TextField({ label, placeholder, suffix, noDiv, ...props }: TextFieldProps & { noDiv?: boolean; }) {
  const LabelWrappedTextField = () => (
      <AtomTF
        placeholder={`Enter ${placeholder || label}`}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: suffix ? (
            <InputAdornment position="start">{suffix}</InputAdornment>
          ) : undefined,
        }}
        {...props}
      />
    );

    return (
      label ? (
        <Labeler label={label as string} noDiv={noDiv}>
          <LabelWrappedTextField />
        </Labeler>
      ) : (
        <LabelWrappedTextField />
      )
    );
}

export default React.memo(TextField);

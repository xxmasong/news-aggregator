import { Stack, Typography } from "@mui/material";
import {
  TextField as AtomTF,
  TextFieldProps,
} from "@/components/atoms/FormFields";
import Labeler from "../FormField/Labeler";

interface TextFieldRangeProps {
  label: string;
  startProps: TextFieldProps;
  endProps: TextFieldProps;
}

function TextFieldRange({ label, startProps, endProps }: TextFieldRangeProps) {
  const { placeholder: sPlaceholder, label: sLabel, ...sProps } = startProps;
  const { placeholder: ePlaceholder, label: eLabel, ...eProps } = endProps;

  return (
    <Labeler label={label as string}>
      <Stack spacing={2} direction="row" alignItems="center">
        <AtomTF
          placeholder={`Enter ${sPlaceholder || sLabel}`}
          fullWidth
          size="small"
          type="number"
          {...sProps}
        />
        <Typography>~</Typography>
        <AtomTF
          placeholder={`Enter ${ePlaceholder || eLabel}`}
          fullWidth
          size="small"
          type="number"
          {...eProps}
        />
      </Stack>
    </Labeler>
  );
}

export default TextFieldRange;

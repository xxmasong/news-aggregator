import { Stack, Typography } from "@mui/material";
import { DatePicker as AtomDatePicker } from "@/components/atoms/FormFields";
import { DatePickerElementProps } from "react-hook-form-mui";
import Labeler from "../FormField/Labeler";

interface DateRangeProps {
  label?: string;
  startProps: DatePickerElementProps;
  endProps: DatePickerElementProps;
}

function DateRange({ 
  label, 
  noDiv,
  persist,
  startProps, 
  endProps 
}: DateRangeProps & { noDiv?: boolean; persist?: boolean }) {
  const LabelWrappedDatePicker = () => (
    <Stack spacing={2} direction="row" alignItems="center">
      <AtomDatePicker {...startProps} />
      <Typography>~</Typography>
      <AtomDatePicker {...endProps} />
    </Stack>
  );

  return (
    label ? (
      <Labeler label={label as string} noDiv={noDiv} persist={persist}>
        <LabelWrappedDatePicker />
      </Labeler> 
    ) : (
      <LabelWrappedDatePicker />
    )
  );
}

export default DateRange;

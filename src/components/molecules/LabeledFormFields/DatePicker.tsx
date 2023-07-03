import { DatePicker as AtomDatePicker } from "@/components/atoms/FormFields";
import React from "react";
import { DatePickerElementProps } from "react-hook-form-mui";
import Labeler from "../FormField/Labeler";

function DatePicker({
  label,
  noDiv,
  persist,
  ...props
}: DatePickerElementProps & { noDiv?: boolean; persist?: boolean }) {
  const LabelWrappedDatePicker = () => (
    <AtomDatePicker {...props} />
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

export default React.memo(DatePicker);

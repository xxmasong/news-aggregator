import { FormControlLabel, Checkbox, Stack } from "@mui/material";
import { DatePicker as AtomDatePicker } from "@/components/atoms/FormFields";
import { DatePickerElementProps } from "react-hook-form-mui";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useDisabledComponent from "@/hooks/useDisabledComponent";

function ConditionalDatePicker({
  label,
  ...props
}: DatePickerElementProps) {
  const [checkValue, setCheckValue] = useState(false);
  const isDisabled = useDisabledComponent();
  const { watch, setValue } = useFormContext();
  const dateValue = watch(props.name);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;
    setCheckValue(check);
    setValue(props.name, check ? "" : null);
    console.error("HERE");
    console.log(check);
  };

  useEffect(() => {
    setCheckValue(dateValue ? false : true);
  }, [dateValue]);

  
  useEffect(() => {
    setCheckValue(checkValue);
    console.log("re-render because x changed:", checkValue);
  }, [checkValue]);

  return (
    <Stack 
      spacing={{sm:0, lg: 2}} 
      direction={{sm: "column", lg: "row"}} 
      alignItems="center"
    >
      <AtomDatePicker {...props} disabled={checkValue || isDisabled} />
      <FormControlLabel
        control={
          <Checkbox 
            checked={checkValue} 
            onChange={handleCheckChange} 
          />
        }
        label={label}
        disabled={isDisabled}
      />
    </Stack>
  );
}

export default ConditionalDatePicker;

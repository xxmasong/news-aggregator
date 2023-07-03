import { Stack, Typography } from "@mui/material";
import {
  RadioGroup,
  RadioGroupProps,
  TextField as AtomTF,
  TextFieldProps,
} from "@/components/atoms/FormFields";
import useDisabledComponent from "@/hooks/useDisabledComponent";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Labeler from "../FormField/Labeler";

interface ConditionalTextFieldRangeProps {
  label: string;
  radioProps: Omit<RadioGroupProps, "options"> & {
    trueLabel: string;
    falseLabel: string;
  };
  startProps: TextFieldProps;
  endProps: TextFieldProps;
}

function ConditionalTextFieldRange({
  label,
  radioProps,
  startProps,
  endProps,
}: ConditionalTextFieldRangeProps) {
  const { placeholder: sPlaceholder, label: sLabel, ...sProps } = startProps;
  const { placeholder: ePlaceholder, label: eLabel, ...eProps } = endProps;
  const isDisabled = useDisabledComponent();
  const { watch, setValue } = useFormContext();
  const radioValue = watch(radioProps.name);

  useEffect(() => {
    if (+radioValue === 0) {
      setValue(sProps.name, null);
      setValue(eProps.name, null);
    }
  }, [radioValue, sProps.name, eProps.name, setValue]);

  return (
    <Labeler label={label as string}>
      <RadioGroup
        row
        labelKey="name"
        {...radioProps}
        disabled={isDisabled}
        options={[
          { id: 0, name: radioProps.falseLabel },
          { id: 1, name: radioProps.trueLabel },
        ]}
      />
      <Stack spacing={2} direction="row" alignItems="center">
        <AtomTF
          placeholder={sPlaceholder || sLabel + "を入力"}
          fullWidth
          size="small"
          type="number"
          disabled={+radioValue !== 1 || isDisabled}
          {...sProps}
        />
        <Typography>~</Typography>
        <AtomTF
          placeholder={ePlaceholder || eLabel + "を入力"}
          fullWidth
          size="small"
          type="number"
          disabled={+radioValue !== 1 || isDisabled}
          {...eProps}
        />
      </Stack>
    </Labeler>
  );
}

export default ConditionalTextFieldRange;

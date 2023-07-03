import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { TextField } from "@/components/atoms/FormFields";
import useDisabledComponent from "@/hooks/useDisabledComponent";
import useOptions from "@/hooks/useOptions";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  CheckboxButtonGroup,
  CheckboxButtonGroupProps,
} from "react-hook-form-mui";
import Labeler from "../FormField/Labeler";

function CheckboxGroup({
  label,
  options,
  othersLabel,
  othersName,
  ...props
}: Omit<CheckboxButtonGroupProps, "options"> & {
  othersLabel?: string;
  options?: any[];
  othersName?: string;
}) {
  const [othersCheckbox, setOthersCheckbox] = useState(false);
  const optionsLists = useOptions();
  const fromList = options || optionsLists?.[props.name] || [];
  const { getValues, setValue } = useFormContext();
  const isDisabled = useDisabledComponent();
  const others = othersName || `${props.name}_others`

  const othersValue = getValues(others) as string;

  const handleOthersCheckbox = (_e: any, checked: boolean) => {
    setOthersCheckbox(checked);
    setValue(others, "", {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (othersValue) {
      setOthersCheckbox(true);
    } else setOthersCheckbox(false);
  }, [othersValue]);

  return (
    <Labeler label={label as string}>
      <Stack>
        <CheckboxButtonGroup
          row
          labelKey="name"
          options={fromList}
          disabled={isDisabled}
          {...props}
        />
        <Stack direction="row" spacing={2}>
          <FormGroup row sx={{ width: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={othersCheckbox}
                  onChange={handleOthersCheckbox}
                  disabled={isDisabled}
                />
              }
              label={othersLabel || "Others"}
            />
            <TextField
              name={others}
              size="small"
              disabled={!othersCheckbox || isDisabled}
              placeholder={(othersLabel || "Others") + "入力"}
              sx={{ flex: 1 }}
            />
          </FormGroup>
        </Stack>
      </Stack>
    </Labeler>
  );
}

export default CheckboxGroup;

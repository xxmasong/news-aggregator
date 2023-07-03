import { Chip, FormControl, FormHelperText, Stack } from "@mui/material";
import useDisabledComponent from "@/hooks/useDisabledComponent";
import useOptions from "@/hooks/useOptions";
import { OptionType } from "interfaces/CommonInterface";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Labeler from "../FormField/Labeler";

interface ButtonFieldProps {
  label: string;
  name: string;
  options?: OptionType[];
  singleValue?: boolean;
}

function ButtonField({ label, options, name, singleValue }: ButtonFieldProps) {
  const [values, setValues] = useState(new Set<number>());
  const optionsLists = useOptions();
  const isDisabled = useDisabledComponent();
  const { getValues, setValue, getFieldState } = useFormContext();
  const value = getValues(name) as number | number[];
  const { invalid, error } = getFieldState(name);

  const handleToggle = (id: number) => {
    const temp = new Set(values);

    if (singleValue) {
      temp.clear();
      temp.add(id);
    } else if (temp.has(id)) temp.delete(id);
    else temp.add(id);

    setValues(temp);
    setValue(name, singleValue ? [...temp][0] : [...temp], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setValues(new Set(typeof value === "number" ? [value] : value));
  }, [value]);

  const fromList = options || optionsLists?.[name] || [];
  return (
    <Labeler label={label}>
      <FormControl error={invalid}>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ gap: (t) => t.spacing(1), minHeight: 40 }}
        >
          {fromList.map(({ id, name }) => (
            <Chip
              variant="filled"
              color={values.has(id) ? "primary" : "default"}
              key={id}
              label={name}
              onClick={() => handleToggle(id)}
              disabled={isDisabled}
            />
          ))}
        </Stack>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Labeler>
  );
}

export default ButtonField;

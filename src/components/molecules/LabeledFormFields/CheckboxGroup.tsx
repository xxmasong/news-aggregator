import useDisabledComponent from "@/hooks/useDisabledComponent";
import useOptions from "@/hooks/useOptions";
import {
  CheckboxButtonGroup,
  CheckboxButtonGroupProps,
} from "react-hook-form-mui";
import Labeler from "../FormField/Labeler";

function CheckboxGroup({
  label,
  options,
  ...props
}: Omit<CheckboxButtonGroupProps, "options"> & { options?: any[] }) {
  const optionsLists = useOptions();
  const fromList = options || optionsLists?.[props.name] || [];
  const isDisabled = useDisabledComponent();

  return (
    <Labeler label={label as string}>
      <CheckboxButtonGroup
        row
        labelKey="name"
        disabled={isDisabled}
        options={fromList}
        {...props}
      />
    </Labeler>
  );
}

export default CheckboxGroup;

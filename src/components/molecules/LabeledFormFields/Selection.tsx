import AtomSelection, {
  SelectElementProps,
} from "@/components/atoms/FormFields/Selection";
import useOptions from "@/hooks/useOptions";
import React from "react";
import Labeler from "../FormField/Labeler";

function Selection({
  label,
  placeholder,
  options,
  persist,
  noDiv,
  ...props
}: SelectElementProps & { noDiv?: boolean; persist?: boolean }) {
  const optionsLists = useOptions();
  const fromList = [
    { id: 0, disabled: true, name: `Select ${placeholder || label}` },
    ...(options || optionsLists?.[props.name] || []),
  ];
  const LabelWrappedSelection = () => (
    <AtomSelection
      size="small"
      labelKey="name"
      options={fromList}
      {...props}
    />
  );

  return (
    label ? (
      <Labeler label={label as string} persist={persist} noDiv={noDiv}>
        <LabelWrappedSelection />
      </Labeler>
    ) : (
      <LabelWrappedSelection />
    )
  );
}

export default React.memo(Selection);

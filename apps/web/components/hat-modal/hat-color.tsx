import { cn } from "../../utils";

export interface HatColorProps {
  color: string;
  isEditable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function HatColor({
  color,
  isEditable = false,
  onChange,
}: HatColorProps) {
  return (
    <input
      type="color"
      defaultValue={color}
      disabled={!isEditable}
      readOnly={!isEditable}
      className={cn({
        editable: isEditable,
      })}
      onChange={onChange}
    />
  );
}

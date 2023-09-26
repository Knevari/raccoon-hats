import { useState } from "react";
import { HatSize as HatSizeType } from "../../contexts/hats";
import { cn } from "../../utils";

export interface HatSizeProps {
  size: HatSizeType;
  isEditable?: boolean;
  isActive?: boolean;
  onChange?: (state: boolean) => void;
}

export function HatSize({
  size,
  isEditable,
  isActive = false,
  onChange,
}: HatSizeProps) {
  const [currentState, setCurrentState] = useState(isActive);

  const activeClassNames = {
    "border-text/100 text-text/100": currentState,
    "cursor-pointer": isEditable,
  };

  const onToggleCurrentState = () => {
    if (isEditable) {
      setCurrentState((prev) => {
        const nextState = !prev;
        onChange?.(nextState);
        return nextState;
      });
    }
  };

  return (
    <strong
      className={cn(
        "flex items-center justify-center h-9 border-2 border-text/40 text-text/40 rounded-lg px-2",
        activeClassNames
      )}
      onClick={onToggleCurrentState}
    >
      {size}
    </strong>
  );
}

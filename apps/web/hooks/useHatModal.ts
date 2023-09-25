import { useState } from "react";
import { Hat } from "../contexts/hats";

export default function useHatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHat, setActiveHat] = useState<Hat | null>(null);

  const openHatModalWith = (hat: Hat) => {
    setActiveHat(hat);
    setIsOpen(true);
  };

  const closeHatModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    activeHat,
    openHatModalWith,
    closeHatModal,
  };
}

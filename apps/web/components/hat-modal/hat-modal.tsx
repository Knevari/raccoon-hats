import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import { AiOutlineClose, AiFillEdit } from "react-icons/ai";

import { HatEdit } from "./hat-edit";
import { HatDetails } from "./hat-details";

import { Hat } from "../../contexts/hats/types";

const imageVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "-100%",
  },
};

const bodyVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "100%",
  },
};

export interface HatModalProps {
  isOpen: boolean;
  activeHat: Hat | null;
  onCloseModal: () => void;
}

export function HatModal({ activeHat, isOpen, onCloseModal }: HatModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  const onToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      className="fixed flex flex-col md:flex-row items-stretch inset-0 w-full h-full bg-transparent overflow-y-auto md:overflow-y-visible"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative flex-1 bg-primary max-w-1/2 flex items-center justify-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2/5 after:bg-[#31576d] after:-z-10"
        variants={imageVariants}
        transition={{ bounce: 0 }}
      >
        {activeHat && (
          <Image
            src={activeHat.imageUrl}
            alt={activeHat.name}
            width={400}
            height={400}
            className="relative rounded-lg shadow-layers-skeleton"
          />
        )}
      </motion.div>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative flex-1 bg-background px-[10%] py-12 max-w-1/2 md:overflow-y-auto"
        variants={bodyVariants}
        transition={{ bounce: 0 }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center text-text">
            <h5 className="text-accent">HAT</h5>
            <div className="flex gap-2">
              <AiFillEdit
                className="text-4xl cursor-pointer"
                onClick={onToggleEdit}
              />
              <AiOutlineClose
                className="text-4xl cursor-pointer"
                onClick={onCloseModal}
              />
            </div>
          </div>
          <ModalContent />
        </div>
      </motion.div>
    </div>
  );

  function ModalContent() {
    if (!activeHat) return null;
    return isEditing ? (
      <HatEdit {...activeHat} onCloseModal={onCloseModal} />
    ) : (
      <HatDetails {...activeHat} />
    );
  }
}

import { motion } from "framer-motion";
import { Hat } from "../../contexts/hats";
import { Divider } from "../divider";
import Image from "next/image";

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
  return (
    <div
      className="fixed flex items-stretch inset-0 w-full h-full bg-transparent"
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
        className="relative flex-1 bg-background px-[10%] py-12 max-w-1/2"
        variants={bodyVariants}
        transition={{ bounce: 0 }}
      >
        {activeHat && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center text-text">
              <h5>HAT</h5>
              <small className="text-4xl cursor-pointer" onClick={onCloseModal}>
                &times;
              </small>
            </div>
            <div>
              <div>
                <h1 className="text-5xl text-primary">{activeHat.name}</h1>
                <small className="text-text">{activeHat.style}</small>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex gap-2 mt-8">
                  {activeHat.colors.map((color) => (
                    <div
                      key={color}
                      className="w-9 h-9"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mt-8">
                  {activeHat.sizes.map((size) => (
                    <strong
                      key={size}
                      className="flex items-center justify-center h-9 border-2 border-text/40 text-text/40 rounded-lg px-2"
                    >
                      {size}
                    </strong>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            <p>{activeHat.details}</p>
            <Divider />
            <div>
              <h5 className="text-base text-text/60">PRICE</h5>
              <h3 className="text-accent">${activeHat.price.toFixed(2)}</h3>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

import Image from "next/image";
import { Hat } from "../../contexts/hats";

export interface HatCardProps
  extends Pick<Hat, "name" | "price" | "imageUrl"> {}

export function HatCard({ name, price, imageUrl }: HatCardProps) {
  return (
    <div className="bg-white rounded-md shadow-md flex flex-col items-center">
      <div className="p-2">
        <div className="bg-accent rounded-lg p-6 shadow-layers">
          <Image
            src={imageUrl}
            alt={name}
            width={192}
            height={252}
            className="w-full mx-auto border-neutral-400/20 rounded-lg -rotate-6 scale-[1.2] border-2 border-primary"
          />
        </div>
      </div>
      <div className="mt-4 p-2 w-full">
        <h5 className="font-normal text-base text-left">{name}</h5>
        <div className="flex flex-col items-stretch justify-between flex-wrap w-full">
          <h5 className="text-lg text-left text-text font-mono leading-6">
            ${price.toFixed(2)}
          </h5>
          <button className="bg-primary text-white/90 px-3 py-2 rounded-md mt-3 hover:bg-accent transition">
            View Full Page
          </button>
        </div>
      </div>
    </div>
  );
}

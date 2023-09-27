import ReactMarkdown from "react-markdown";

import { Divider } from "../divider";
import { HatColor } from "./hat-color";
import { HatSize } from "./hat-size";

import { Hat } from "../../contexts/hats";

export function HatDetails({
  name,
  style,
  colors,
  sizes,
  details,
  price,
}: Hat) {
  return (
    <>
      <div>
        <div>
          <h1 className="text-5xl text-primary">{name}</h1>
          <small className="text-text">{style}</small>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-2 mt-8">
            {colors.map((color) => (
              <HatColor key={color} color={color} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {sizes.map((size) => (
              <HatSize key={size} size={size} />
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <ReactMarkdown>{details}</ReactMarkdown>
      <Divider />
      <div>
        <h5 className="text-base text-text/60">PRICE</h5>
        <h3 className="text-accent">${price.toFixed(2)}</h3>
      </div>
    </>
  );
}

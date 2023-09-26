import { Hat } from "../../contexts/hats";
import { Divider } from "../divider";

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
          <div className="flex gap-2 mt-8">
            {colors.map((color) => (
              <div
                key={color}
                className="w-9 h-9"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-8">
            {sizes.map((size) => (
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
      <p>{details}</p>
      <Divider />
      <div>
        <h5 className="text-base text-text/60">PRICE</h5>
        <h3 className="text-accent">${price.toFixed(2)}</h3>
      </div>
    </>
  );
}

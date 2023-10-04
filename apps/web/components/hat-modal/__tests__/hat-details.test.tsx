import { screen, render } from "@testing-library/react";
import { HatDetails, HatDetailsProps } from "../hat-details";

const hatDetailsProps = {
  name: "Wool 504",
  style: "Fedora",
  colors: ["#c4c4c4", "#f9f9f9", "#1e2328"],
  sizes: ["XL", "XXL"],
  details: "A very nice hat for you to wear on a daily basis",
  price: 20,
} as HatDetailsProps;

describe("Hat Details", () => {
  it("renders the correct hat name", () => {
    render(<HatDetails {...hatDetailsProps} />);

    const name = screen.getByText(hatDetailsProps.name);

    expect(name).toBeDefined();
    expect(name.textContent).toMatch(hatDetailsProps.name);
  });

  it("renders the correct hat style", () => {
    render(<HatDetails {...hatDetailsProps} />);

    const style = screen.getByText(hatDetailsProps.style);

    expect(style.textContent).toMatch(hatDetailsProps.style);
  });

  it("renders a list of colors", () => {
    render(<HatDetails {...hatDetailsProps} />);

    const colors = screen.queryAllByTestId("hat-color");

    expect(colors).toHaveLength(hatDetailsProps.colors.length);
  });

  it("renders a list of sizes", () => {
    render(<HatDetails {...hatDetailsProps} />);

    const sizes = screen.queryAllByTestId("hat-size");

    expect(sizes).toHaveLength(hatDetailsProps.sizes.length);
  });
});

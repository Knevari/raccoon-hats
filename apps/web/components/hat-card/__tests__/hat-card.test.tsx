import { render, screen, waitFor } from "@testing-library/react";
import { HatCard } from "../hat-card";
import userEvent from "@testing-library/user-event";

const hatCardProps = {
  name: "Wool 504",
  price: 50,
  imageUrl:
    "https://res.cloudinary.com/dtnbuzwfd/image/upload/v1678376101/cld-sample-5.jpg",
};

const hatCardClickHandler = jest.fn();

describe("Hat Card", () => {
  it("should render the correct image", async () => {
    render(<HatCard {...hatCardProps} onClick={hatCardClickHandler} />);

    waitFor(() => {
      const image = screen.getByAltText(hatCardProps.name);

      expect(image).toBeDefined();
      expect(image.getAttribute("src")).toBe(hatCardProps.imageUrl);
    });
  });

  it("should render the correct price", () => {
    render(<HatCard {...hatCardProps} onClick={hatCardClickHandler} />);

    const priceHeading = screen.getByTestId("hat-card-heading");

    expect(priceHeading).toBeDefined();
    expect(priceHeading.textContent).toMatch(
      `$${hatCardProps.price.toFixed(2).toString()}`
    );
  });

  it("should call the onClick function", async () => {
    render(<HatCard {...hatCardProps} onClick={hatCardClickHandler} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(hatCardClickHandler).toHaveBeenCalled();
  });
});

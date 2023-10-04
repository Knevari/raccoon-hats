import { render, screen, fireEvent } from "@testing-library/react";
import { HatColor } from "../hat-color";
import userEvent from "@testing-library/user-event";

const hatColorProps = {
  color: "#f74d4d",
  isEditable: false,
};

describe("Hat Color", () => {
  it("render an input", () => {
    render(<HatColor {...hatColorProps} />);

    const input = screen.getByTestId("hat-color");

    expect(input).toBeDefined();
  });

  it("should have a default color", () => {
    render(<HatColor {...hatColorProps} />);

    const input: HTMLInputElement = screen.getByTestId("hat-color");

    expect(input.value).toBe("#f74d4d");
  });

  it("should be disabled", () => {
    render(<HatColor {...hatColorProps} />);

    const input: HTMLInputElement = screen.getByTestId("hat-color");

    expect(input.disabled).toBeTruthy();
    expect(input.readOnly).toBeTruthy();
  });

  it("should be editable", () => {
    render(<HatColor color={hatColorProps.color} isEditable={true} />);

    const input: HTMLInputElement = screen.getByTestId("hat-color");

    fireEvent.input(input, {
      target: {
        value: "#ffffff",
      },
    });

    expect(input.value).toBe("#ffffff");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import SelectSession from "./../../../app/_components/Admin/SelectSession";
import React from "react";

describe("SelectSession Component", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const mockSendOption = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with provided options", () => {
    render(<SelectSession options={mockOptions} sendOption={mockSendOption} />);

    // Check if all options are rendered
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("should have the first option selected by default", () => {
    render(<SelectSession options={mockOptions} sendOption={mockSendOption} />);

    const firstOption = screen.getByText(mockOptions[0]);
    expect(firstOption).toHaveClass("bg-[var(--color-primary)] text-white");
  });

  it("should change the selected session when an option is clicked", () => {
    render(<SelectSession options={mockOptions} sendOption={mockSendOption} />);

    const secondOption = screen.getByText(mockOptions[1]);

    fireEvent.click(secondOption);

    expect(secondOption).toHaveClass("bg-[var(--color-primary)] text-white");

    // The first option should no longer have the active class
    const firstOption = screen.getByText(mockOptions[0]);
    expect(firstOption).not.toHaveClass("bg-[var(--color-primary)] text-white");
  });

  it("should call sendOption function with the correct index when an option is clicked", () => {
    render(<SelectSession options={mockOptions} sendOption={mockSendOption} />);

    const secondOption = screen.getByText(mockOptions[1]);

    fireEvent.click(secondOption);

    expect(mockSendOption).toHaveBeenCalledWith(1);
  });

  it("should apply correct styling to selected option", () => {
    render(<SelectSession options={mockOptions} sendOption={mockSendOption} />);

    const thirdOption = screen.getByText(mockOptions[2]);

    fireEvent.click(thirdOption);

    expect(thirdOption).toHaveClass("bg-[var(--color-primary)] text-white");

    // Ensure other options do not have active styling
    mockOptions.slice(0, 2).forEach((option) => {
      expect(screen.getByText(option)).not.toHaveClass(
        "bg-[var(--color-primary)] text-white"
      );
    });
  });
});

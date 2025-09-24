// src/components/PointsDropdown/PointsDropdown.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PointsDropdown from "./PointsDropdown";
import type { GetPointsQuery } from "../../../generated/graphql";

//Headless ui needed function
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

//hook and mapper mocks
vi.mock("../../../utils/CustomHooks", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("../../../utils/DataMapper", () => ({
  numberMap: {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  },
}));

vi.mock("react-icons/ri", () => ({
  RiAddBoxFill: () => <div data-testid="add-box-icon">AddBoxIcon</div>,
}));

import { useMediaQuery } from "../../../utils/CustomHooks";

const mockedUseMediaQuery = vi.mocked(useMediaQuery);

describe("PointsDropdown Component", () => {
  // Mock data
  const mockOptions: GetPointsQuery = {
    __typename: "Query",
    __type: {
      __typename: "__Type",
      name: "PointEstimate",
      enumValues: [
        { __typename: "__EnumValue", name: "ONE" },
        { __typename: "__EnumValue", name: "TWO" },
        { __typename: "__EnumValue", name: "THREE" },
        { __typename: "__EnumValue", name: "ZERO" },
        { __typename: "__EnumValue", name: "FIVE" },
      ],
    },
  };

  const mockProps = {
    selectedValue: undefined,
    options: mockOptions,
    isLoading: false,
    hasError: false,
    onSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default to desktop view
    mockedUseMediaQuery.mockReturnValue(true);
  });

  // Basic Rendering Tests
  describe("Rendering", () => {
    it("should render with default state", () => {
      render(<PointsDropdown {...mockProps} />);

      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Estimate")).toBeInTheDocument();
      expect(screen.getByTestId("add-box-icon")).toBeInTheDocument();
    });

    it("should render with selected value", () => {
      render(<PointsDropdown {...mockProps} selectedValue="THREE" />);

      expect(screen.getByText("3 Points")).toBeInTheDocument();
      expect(screen.getByTestId("add-box-icon")).toBeInTheDocument();
    });

    it("should show loading state", () => {
      render(<PointsDropdown {...mockProps} isLoading={true} />);
    });

    it("should handle undefined options gracefully", () => {
      render(<PointsDropdown {...mockProps} options={undefined} />);

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // Menu Interaction Tests
  describe("Menu Interactions", () => {
    it("should open menu when clicked", async () => {
      const user = userEvent.setup();
      render(<PointsDropdown {...mockProps} />);

      await user.click(screen.getByRole("button"));

      // Menu title
      expect(screen.getAllByText("Estimate")).toHaveLength(2);
    });

    it("should display all options when menu is open", async () => {
      const user = userEvent.setup();
      render(<PointsDropdown {...mockProps} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("5 Points")).toBeInTheDocument();
      expect(screen.getByText("3 Points")).toBeInTheDocument();
      expect(screen.getByText("2 Points")).toBeInTheDocument();
      expect(screen.getByText("1 Points")).toBeInTheDocument();
      expect(screen.getByText("0 Points")).toBeInTheDocument();
    });

    it("should sort options in descending order", async () => {
      const user = userEvent.setup();
      render(<PointsDropdown {...mockProps} />);

      await user.click(screen.getByRole("button"));

      const pointElements = screen.getAllByText(/\d+ Points/);
      const points = pointElements.map((el) =>
        parseInt(el.textContent?.split(" ")[0] || "0"),
      );

      expect(points).toEqual([5, 3, 2, 1, 0]);
    });

    it("should show loading state in dropdown", async () => {
      const user = userEvent.setup();
      render(<PointsDropdown {...mockProps} isLoading={true} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  // Selection Tests
  describe("Option Selection", () => {
    it("should call onSelect when an option is clicked", async () => {
      const user = userEvent.setup();
      const mockOnSelect = vi.fn();

      render(<PointsDropdown {...mockProps} onSelect={mockOnSelect} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("3 Points"));

      expect(mockOnSelect).toHaveBeenCalledWith("THREE");
    });

    it("should call onSelect with correct value for each option", async () => {
      const user = userEvent.setup();
      const mockOnSelect = vi.fn();

      render(<PointsDropdown {...mockProps} onSelect={mockOnSelect} />);

      await user.click(screen.getByRole("button"));

      // Test multiple selections
      await user.click(screen.getByText("5 Points"));
      expect(mockOnSelect).toHaveBeenCalledWith("FIVE");

      mockOnSelect.mockClear();

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("1 Points"));
      expect(mockOnSelect).toHaveBeenCalledWith("ONE");
    });
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button Component", () => {
  // Basic Rendering Tests
  describe("Rendering", () => {
    it("should render with children text", () => {
      render(<Button>Prop children</Button>);
      expect(
        screen.getByRole("button", { name: "Prop children" }),
      ).toBeInTheDocument();
    });

    it("should render with default props", () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toBeDisabled();
    });

    it("should render children correctly", () => {
      render(
        <Button>
          <span>Complex</span> Content
        </Button>,
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  // Prop tests
  describe("Renders with applied props", () => {
    it("should render disabled", () => {
      render(<Button disabled={true}>Disabled</Button>);
      expect(screen.getByText("Disabled")).toBeDisabled();
    });

    it("should be active by default", () => {
      render(<Button>Active</Button>);
      expect(screen.getByText("Active")).not.toBeDisabled();
    });

    it("should have the proper type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
    });

    it("should have primary variant styling", () => {
      render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText("Primary")).toHaveClass(
        "bg-primary hover:bg-primary/90 text-button",
      );
    });

    it("should have neutral variant styling by default", () => {
      render(<Button>Neutral</Button>);
      expect(screen.getByText("Neutral")).toHaveClass(
        "bg-inherit hover:bg-accent text-font",
      );
    });

    it("should be visible by default", () => {
      render(<Button>Neutral</Button>);
      expect(screen.getByText("Neutral")).not.toHaveClass("hidden");
      expect(screen.getByText("Neutral")).not.toHaveClass("lg:hidden");
    });
    it("should be hidden on the specified screen size", () => {
      render(<Button visibility="desktop">Desktop</Button>);
      expect(screen.getByText("Desktop")).toHaveClass("hidden");
    });
  });

  // On click events
  describe("Calls click handlers", () => {
    it("should call on Click handler when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalled();
    });
    it("should not call click handler when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button disabled={true}>Disabled</Button>);
      await user.click(screen.getByText("Disabled"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});

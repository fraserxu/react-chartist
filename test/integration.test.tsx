import { render, waitFor } from "@testing-library/react";
import { beforeAll, expect, it, vi } from "vitest";
import { ChartistGraph } from "../src";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
});

it("renders an SVG with Chartist 1.x", async () => {
  const { container } = render(
    <ChartistGraph data={{ labels: ["Mon", "Tue"], series: [[5, 8]] }} type="Line" />,
  );

  await waitFor(() => expect(container.querySelector("svg")).not.toBeNull());
});

import { render, waitFor } from "@testing-library/react";
import type { LineChartOptions, Plugin } from "chartist";
import { compat } from "chartist-2/compat";
import { createRef } from "react";
import { beforeAll, expect, it, vi } from "vitest";
import { ChartistGraph, type ChartistGraphHandle } from "../src";

// Resolve the component's `import ... from "chartist"` to Chartist 2 for this file only.
vi.mock("chartist", async () => await import("chartist-2"));

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

const lineData = { labels: ["Mon", "Tue"], series: [[5, 8]] };

// The component's prop types come from the "chartist" package, which tsc resolves to Chartist 1.5
// in this repo's default setup (the mock above is runtime only). Chartist 2's `compat` plugin is a
// `ChartPlugin` object, which 1.5's `Plugin` type (a function) doesn't describe, so the cast goes
// via `unknown`. The cast is only needed because tsc sees the 1.5 types here.
const compatOptions: LineChartOptions = { plugins: [compat as unknown as Plugin] };

it("mocks the chartist module with Chartist 2", async () => {
  const chartist = await import("chartist");

  // Chartist 2 adds functional constructors such as lineChart; Chartist 1.x only has classes.
  expect(chartist).toHaveProperty("lineChart", expect.any(Function));
  expect(chartist).toHaveProperty("LineChart", expect.any(Function));
  expect(compat).toMatchObject({ name: "compat", install: expect.any(Function) });
});

it("renders a line chart and detaches it on unmount", async () => {
  const ref = createRef<ChartistGraphHandle>();
  const { container, unmount } = render(<ChartistGraph data={lineData} ref={ref} type="Line" />);

  await waitFor(() => expect(container.querySelector("svg")).not.toBeNull());

  const chart = ref.current?.chart;
  if (!chart) throw new Error("Expected the Chartist instance to be exposed through the ref");
  const detach = vi.spyOn(chart, "detach");

  unmount();

  expect(detach).toHaveBeenCalledTimes(1);
});

it.each([
  ["Bar", () => <ChartistGraph data={{ labels: ["A", "B"], series: [[3, 7]] }} type="Bar" />],
  ["Pie", () => <ChartistGraph data={{ series: [20, 30, 50] }} type="Pie" />],
])("renders a %s chart", async (_type, renderChart) => {
  const { container } = render(renderChart());

  await waitFor(() => expect(container.querySelector("svg")).not.toBeNull());
});

it("fires 1.x-style events with the compat plugin", async () => {
  const onCreated = vi.fn();
  const onDraw = vi.fn();

  render(
    <ChartistGraph
      data={lineData}
      listener={{ created: onCreated, draw: onDraw }}
      options={compatOptions}
      type="Line"
    />,
  );

  await waitFor(() => expect(onDraw).toHaveBeenCalled());
  await waitFor(() => expect(onCreated).toHaveBeenCalled());
});

import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChartistGraph, type ChartistGraphHandle } from "../src";

interface MockChart {
  constructorArgs: unknown[];
  detach: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  type: string;
  update: ReturnType<typeof vi.fn>;
}

const chartistMock = vi.hoisted((): { instances: MockChart[] } => ({
  instances: [],
}));

vi.mock("chartist", () => {
  function createConstructor(type: string) {
    return class {
      constructorArgs: unknown[];
      detach = vi.fn();
      off = vi.fn();
      on = vi.fn();
      type = type;
      update = vi.fn();

      constructor(...args: unknown[]) {
        this.constructorArgs = args;
        chartistMock.instances.push(this);
      }
    };
  }

  return {
    BarChart: createConstructor("Bar"),
    LineChart: createConstructor("Line"),
    PieChart: createConstructor("Pie"),
  };
});

describe("ChartistGraph", () => {
  beforeEach(() => {
    chartistMock.instances.length = 0;
  });

  it("creates the selected chart and exposes the familiar ct-chart class", () => {
    const data = { labels: ["Mon"], series: [[5]] };
    const options = { high: 10 };
    const responsiveOptions: [string, typeof options][] = [["screen", { high: 8 }]];
    const { container } = render(
      <ChartistGraph
        aria-label="Weekly sales"
        className="ct-perfect-fourth"
        data={data}
        options={options}
        responsiveOptions={responsiveOptions}
        type="Bar"
      />,
    );

    expect(chartistMock.instances).toHaveLength(1);
    expect(chartistMock.instances[0]?.type).toBe("Bar");
    expect(chartistMock.instances[0]?.constructorArgs.slice(1)).toEqual([
      data,
      options,
      responsiveOptions,
    ]);
    expect(container.firstElementChild?.classList.contains("ct-chart")).toBe(true);
    expect(container.firstElementChild?.classList.contains("ct-perfect-fourth")).toBe(true);
    expect(container.firstElementChild?.getAttribute("aria-label")).toBe("Weekly sales");
  });

  it("updates data and options without recreating the chart", () => {
    const initialData = { series: [[1, 2]] };
    const nextData = { series: [[3, 4]] };
    const { rerender } = render(<ChartistGraph data={initialData} type="Line" />);
    const chart = chartistMock.instances[0];

    rerender(<ChartistGraph data={nextData} options={{ showPoint: false }} type="Line" />);

    expect(chartistMock.instances).toHaveLength(1);
    expect(chart?.update).toHaveBeenCalledWith(nextData, { showPoint: false }, false);
  });

  it("recreates the chart when its type or responsive options change", () => {
    const data = { series: [[1, 2]] };
    const firstResponsive: [string, { high: number }][] = [["screen", { high: 5 }]];
    const secondResponsive: [string, { high: number }][] = [["print", { high: 10 }]];
    const { rerender } = render(
      <ChartistGraph data={data} responsiveOptions={firstResponsive} type="Bar" />,
    );
    const firstChart = chartistMock.instances[0];

    rerender(<ChartistGraph data={data} responsiveOptions={secondResponsive} type="Bar" />);
    expect(firstChart?.detach).toHaveBeenCalledOnce();
    expect(chartistMock.instances).toHaveLength(2);

    rerender(<ChartistGraph data={data} type="Line" />);
    expect(chartistMock.instances[1]?.detach).toHaveBeenCalledOnce();
    expect(chartistMock.instances[2]?.type).toBe("Line");
  });

  it("keeps event handlers in sync", () => {
    const data = { series: [[1, 2]] };
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const { rerender } = render(
      <ChartistGraph data={data} listener={{ created: firstHandler }} type="Line" />,
    );
    const chart = chartistMock.instances[0];

    expect(chart?.on).toHaveBeenCalledWith("created", firstHandler);

    rerender(<ChartistGraph data={data} listener={{ created: secondHandler }} type="Line" />);
    expect(chart?.off).toHaveBeenCalledWith("created", firstHandler);
    expect(chart?.on).toHaveBeenCalledWith("created", secondHandler);
  });

  it("exposes the chart and element through its ref and detaches on unmount", () => {
    const ref = createRef<ChartistGraphHandle>();
    const { unmount } = render(<ChartistGraph data={{ series: [10, 20] }} ref={ref} type="Pie" />);
    const chart = chartistMock.instances[0];

    expect(ref.current?.chart).toBe(chart);
    expect(ref.current?.element).toBeInstanceOf(HTMLDivElement);

    act(() => unmount());
    expect(chart?.detach).toHaveBeenCalledOnce();
  });
});

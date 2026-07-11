import {
  BarChart,
  type BarChartData,
  type BarChartEventsTypes,
  type BarChartOptions,
  type Data,
  type EventListener,
  LineChart,
  type LineChartData,
  type LineChartEventsTypes,
  type LineChartOptions,
  type Options,
  PieChart,
  type PieChartData,
  type PieChartEventsTypes,
  type PieChartOptions,
  type ResponsiveOptions,
} from "chartist";
import {
  forwardRef,
  type HTMLAttributes,
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type ChartType = "Line" | "Bar" | "Pie";
export type ChartInstance = LineChart | BarChart | PieChart;

type AllEventsListener = (event: string, data: unknown) => void;

export type ChartistEventHandlers<TEvents> = {
  [EventName in keyof TEvents]?: EventListener<TEvents[EventName]>;
} & {
  "*"?: AllEventsListener;
};

interface SharedChartistGraphProps<TType extends ChartType, TData, TOptions, TEvents>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Chartist data for the selected chart type. */
  data: TData;
  /** Chartist event handlers, keyed by event name. */
  listener?: ChartistEventHandlers<TEvents>;
  /** Chartist options for the selected chart type. */
  options?: TOptions;
  /** Media-query and option pairs. Changing this value recreates the chart. */
  responsiveOptions?: ResponsiveOptions<TOptions>;
  /** The Chartist chart constructor to use. */
  type: TType;
}

export interface LineChartProps
  extends SharedChartistGraphProps<"Line", LineChartData, LineChartOptions, LineChartEventsTypes> {}

export interface BarChartProps
  extends SharedChartistGraphProps<"Bar", BarChartData, BarChartOptions, BarChartEventsTypes> {}

export interface PieChartProps
  extends SharedChartistGraphProps<"Pie", PieChartData, PieChartOptions, PieChartEventsTypes> {}

export type ChartistGraphProps = LineChartProps | BarChartProps | PieChartProps;

export interface ChartistGraphHandle {
  /** The current Chartist instance. */
  readonly chart: ChartInstance | null;
  /** The div owned by Chartist. */
  readonly element: HTMLDivElement | null;
}

type AnyChartData = LineChartData | BarChartData | PieChartData;
type AnyChartOptions = LineChartOptions | BarChartOptions | PieChartOptions;
type AnyResponsiveOptions = ResponsiveOptions<AnyChartOptions>;
type AnyEventHandlers =
  | ChartistEventHandlers<LineChartEventsTypes>
  | ChartistEventHandlers<BarChartEventsTypes>
  | ChartistEventHandlers<PieChartEventsTypes>;

const EMPTY_OPTIONS: AnyChartOptions = {};
const EMPTY_RESPONSIVE_OPTIONS: AnyResponsiveOptions = [];

function createChart(
  type: ChartType,
  element: HTMLDivElement,
  data: AnyChartData,
  options: AnyChartOptions,
  responsiveOptions: AnyResponsiveOptions,
): ChartInstance {
  switch (type) {
    case "Line":
      return new LineChart(
        element,
        data as LineChartData,
        options as LineChartOptions,
        responsiveOptions as ResponsiveOptions<LineChartOptions>,
      );
    case "Bar":
      return new BarChart(
        element,
        data as BarChartData,
        options as BarChartOptions,
        responsiveOptions as ResponsiveOptions<BarChartOptions>,
      );
    case "Pie":
      return new PieChart(
        element,
        data as PieChartData,
        options as PieChartOptions,
        responsiveOptions as ResponsiveOptions<PieChartOptions>,
      );
  }
}

function joinClassNames(className?: string): string {
  return className ? `ct-chart ${className}` : "ct-chart";
}

function addEventHandlers(chart: ChartInstance, listener?: AnyEventHandlers): void {
  if (!listener) return;

  for (const [event, handler] of Object.entries(listener)) {
    if (handler) chart.on(event, handler as EventListener);
  }
}

function removeEventHandlers(chart: ChartInstance, listener?: AnyEventHandlers): void {
  if (!listener) return;

  for (const [event, handler] of Object.entries(listener)) {
    if (handler) chart.off(event, handler as EventListener);
  }
}

export const ChartistGraph = forwardRef<ChartistGraphHandle, ChartistGraphProps>(
  function ChartistGraph(props, forwardedRef: Ref<ChartistGraphHandle>) {
    const {
      className,
      data,
      listener,
      options = EMPTY_OPTIONS,
      responsiveOptions = EMPTY_RESPONSIVE_OPTIONS,
      type,
      ...divProps
    } = props;
    const chartRef = useRef<ChartInstance | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const latestConfigRef = useRef({ data, options });
    const latestListenerRef = useRef(listener);
    const lastAppliedConfigRef = useRef<{ data: AnyChartData; options: AnyChartOptions } | null>(
      null,
    );
    const lastAppliedListenerRef = useRef<{
      chart: ChartInstance;
      listener?: AnyEventHandlers;
    } | null>(null);

    latestConfigRef.current = { data, options };
    latestListenerRef.current = listener;

    useImperativeHandle(
      forwardedRef,
      () => ({
        get chart() {
          return chartRef.current;
        },
        get element() {
          return elementRef.current;
        },
      }),
      [],
    );

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const config = latestConfigRef.current;
      const chart = createChart(
        type,
        element,
        config.data,
        config.options,
        responsiveOptions as AnyResponsiveOptions,
      );

      chartRef.current = chart;
      lastAppliedConfigRef.current = config;
      addEventHandlers(chart, latestListenerRef.current);
      lastAppliedListenerRef.current = { chart, listener: latestListenerRef.current };

      return () => {
        const appliedListener = lastAppliedListenerRef.current;
        if (appliedListener?.chart === chart) {
          removeEventHandlers(chart, appliedListener.listener);
        }
        chart.detach();
        if (chartRef.current === chart) chartRef.current = null;
        if (lastAppliedListenerRef.current?.chart === chart) lastAppliedListenerRef.current = null;
      };
    }, [type, responsiveOptions]);

    useEffect(() => {
      const chart = chartRef.current;
      const lastConfig = lastAppliedConfigRef.current;

      if (!chart || (lastConfig?.data === data && lastConfig.options === options)) return;

      chart.update(data as Data, options as Options, false);
      lastAppliedConfigRef.current = { data, options };
    }, [data, options]);

    useEffect(() => {
      const chart = chartRef.current;
      const lastApplied = lastAppliedListenerRef.current;
      if (!chart || (lastApplied?.chart === chart && lastApplied.listener === listener)) return;

      if (lastApplied) removeEventHandlers(lastApplied.chart, lastApplied.listener);
      addEventHandlers(chart, listener);
      lastAppliedListenerRef.current = { chart, listener };
    }, [listener]);

    return <div {...divProps} className={joinClassNames(className)} ref={elementRef} />;
  },
);
ChartistGraph.displayName = "ChartistGraph";

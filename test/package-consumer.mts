import ChartistGraph, {
  type BarChartProps,
  type ChartistGraphHandle,
  ChartistGraph as NamedChartistGraph,
} from "react-chartist";

const props: BarChartProps = {
  data: { labels: ["A", "B"], series: [[1, 2]] },
  options: { horizontalBars: true },
  type: "Bar",
};

const graph = ChartistGraph;
const namedGraph = NamedChartistGraph;
const handle: ChartistGraphHandle = { chart: null, element: null };

void graph;
void handle;
void namedGraph;
void props;

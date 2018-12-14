import * as React from 'react';
import { IChartOptions } from 'chartist';

export interface ChartitGraphProps {
  type: 'Line' | 'Bar' | 'Pie';
  data: object;
  className?: string;
  options?: IChartOptions;
  responsiveOptions?: Array;
  style?: React.CSSProperties;
}

export class ChartistGraph extends React.Component<ChartitGraphProps> {}
export default ChartistGraph;

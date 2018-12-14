import { ChartitGraphProps } from './index.d';
import * as React from 'react';
import {
  IChartOptions,
  IResponsiveOptionTuple,
  ILineChartOptions,
  IBarChartOptions,
  IPieChartOptions,
} from 'chartist';

export interface ChartitGraphProps {
  type: string;
  data: object;
  className?: string;
  options?: IChartOptions;
  style?: React.CSSProperties;
}

export interface ChartitGraphLineProps extends ChartitGraphProps {
  type: 'Line';
  options?: ILineChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>;
}

export interface ChartitGraphPieProps extends ChartitGraphProps {
  type: 'Pie';
  options?: IPieChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>;
}

export interface ChartitGraphBarProps extends ChartitGraphProps {
  type: 'Bar';
  options: IBarChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<IBarChartOptions>>;
}

export default class ChartistGraph extends React.Component<ChartitGraphProps> {}

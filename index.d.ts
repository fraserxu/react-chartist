import * as React from 'react';

export interface ChartitGraphProps {
  type: 'Line' | 'Bar' | 'Pie';
  data: object;
  className?: string;
  options?: IChartOptions;
  responsiveOptions?: Array<IResponsiveOptionTuple>;
  style?: React.CSSProperties;
}

export class ChartistGraph extends React.Component<ChartitGraphProps> {}

import * as React from 'react'

import {
  IBarChartOptions,
  ICandleChartOptions,
  IChartOptions,
  ILineChartOptions,
  IPieChartOptions,
  IResponsiveOptionTuple,
} from 'chartist'

export type ChartistListenerOptions = {[key: string]: Function}

interface BaseChartistGraphProps {
  data: Object
  className?: string
  options?: IChartOptions
  style?: React.CSSProperties
  listener?: ChartistListenerOptions
}

export interface ChartistGraphBarProps extends BaseChartistGraphProps {
  type: 'Bar'
  options: IBarChartOptions
  responsiveOptions?: Array<IResponsiveOptionTuple<IBarChartOptions>>
}

export interface ChartistGraphCandleProps extends BaseChartistGraphProps {
  type: 'Candle'
  options: ICandleChartOptions
  responsiveOptions?: Array<IResponsiveOptionTuple<ICandleChartOptions>>
}

export interface ChartistGraphLineProps extends BaseChartistGraphProps {
  type: 'Line'
  options?: ILineChartOptions
  responsiveOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>
}

export interface ChartistGraphPieProps extends BaseChartistGraphProps {
  type: 'Pie'
  options?: IPieChartOptions
  responsiveOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>
}

export type ChartistGraphProps = ChartistGraphBarProps | ChartistGraphCandleProps | ChartistGraphLineProps | ChartistGraphPieProps

export default class ChartistGraph extends React.Component<ChartistGraphProps> {}

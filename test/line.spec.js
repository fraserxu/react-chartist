import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Graph, Interpolation } from '../index.js'

const generateRandomGraphValues = () =>
  Array.apply(null, Array(29)).map((val, i) =>
    i % 7 === 0 ? Number(Math.floor(Math.random() * 23) + 1) : null)

const props = {
  data: {
    series: [ generateRandomGraphValues() ]
  },
  options: {
    high: 25,
    low: 0,
    fullWidth: true,
    height: '200px',
    showArea: true,
    chartPadding: {
      left: 0,
      right: 0
    },
    lineSmooth: Interpolation.simple({
      fillHoles: true
    }),
    axisY: {
      showLabel: false,
      offset: 0
    },
    axisX: {
      showGrid: false,
      labelInterpolationFnc: (value, index) =>
        index % 7 === 0 ? value : null
    }
  }
}

describe('<Graph type="line" />', () => {
  let wrapper;

  before(() => {
    wrapper = shallow(<Graph data={props.data} options={props.options} type="Line" />);
  });

  it('should expose Interpolation', () => {
    expect(Interpolation).to.not.be.undefined;
  });

  it('should render a line chart', () => {
    expect(wrapper.find('.ct-chart')).to.have.length(1);
  });
});

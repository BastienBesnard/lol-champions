// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// Recharts components
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// Config
import { COLORS_LINE_CHART } from '../config/colors';

const SimpleLineChart = ({ title, data, dataKeyList }) => {
    return (
        <div data-app='line-chart'>
            <div data-app='title'>{title}</div>
            <LineChart width={500} height={350} data={data}>
                <XAxis dataKey='name' />
                <YAxis domain={['dataMin', 'dataMax']} />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Legend />
                {_.map(dataKeyList, (o, i) => 
                    <Line key={o.dataKey} type='monotone' dataKey={o.dataKey} name={o.name} stroke={COLORS_LINE_CHART[i % COLORS_LINE_CHART.length]} dot={false} />
                )}
            </LineChart>
        </div>
    );
}

SimpleLineChart.displayName = 'SimpleLineChart';
SimpleLineChart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataKeyList: PropTypes.array.isRequired
};
SimpleLineChart.defaultProps = {};

export default SimpleLineChart;
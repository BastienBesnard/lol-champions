// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// Recharts components
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// Config
import { COLORS_BAR_CHART } from '../config/colors';

const SimpleBarChart = ({ title, data, dataKeyList }) => {
    return (
        <div data-app='bar-chart'>
            <div data-app='title'>{title}</div>
            <BarChart width={500} height={350} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey='name'/>
                <YAxis/>
                <CartesianGrid strokeDasharray='3 3'/>
                <Tooltip/>
                <Legend />
                {_.map(dataKeyList, (o, i) => 
                    <Bar key={o.dataKey} dataKey={o.dataKey} name={o.name} fill={COLORS_BAR_CHART[i % COLORS_BAR_CHART.length]} />
                )}        
            </BarChart>
        </div>
    );
}

SimpleBarChart.displayName = 'SimpleBarChart';
SimpleBarChart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataKeyList: PropTypes.array.isRequired
};
SimpleBarChart.defaultProps = {};

export default SimpleBarChart;
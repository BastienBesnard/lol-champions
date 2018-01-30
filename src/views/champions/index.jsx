// Libs
import React, { Component } from 'react';
import _ from 'lodash';
// React Toolbox components
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import IconButton from 'react-toolbox/lib/button/IconButton';
// Components
import Table from '../../components/table';
import LineChart from '../../components/line-chart';
import BarChart from '../../components/bar-chart';
// Config
import { TITLE, POOL_ID_LIST, SUPP_ID_LIST } from '../../config';
import STATIC_DATA from '../../config/static-data.json';
import { COLUMNS, COLUMNS_TWO } from '../../config/table';
import { BAR_CHART_LIST, LINE_CHART_LIST } from '../../config/chart';
// Helpers
import { computeTableOne, computeTableTwo } from '../../helpers/table';
import { computeLineChart, computeBarChart, computeDataKeyListLineChart } from '../../helpers/chart';
// Constants
const SORTED_DEFAULT = { name: 'name', value: 'asc' };
const IS_POOL_FILTER = 'isPool';
const IS_SUPP_FILTER = 'isSupp';
const NB_MAX_ITEM_CHART = 5;

// FIXME: Select list, should display label instead of key -> React toolbox issue

class Champions extends Component {
    constructor(props) {
        super(props);

        const { data, version } = STATIC_DATA;

        this.state = {
            data,
            version,
            filterList: {
                isSupp: false,
                isPool: false
            },
            sorted: _.clone(SORTED_DEFAULT),
            autocomplete: [],
            tabIndex: 0,
            navActive: true
        };

        this.computeList = this.computeList.bind(this);
        this.computeTableOne = this.computeTableOne.bind(this);
        this.computeTableTwo = this.computeTableTwo.bind(this);

        this.handleSortClick = this.handleSortClick.bind(this);

        this.computeSource = this.computeSource.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    computeList() {
        const { autocomplete } = this.state;
        let data = _.clone(this.state.data);
        let res = [];
        if (autocomplete.length > 0) {
            res = _.filter(data, o => _.findIndex(autocomplete, str => str === o.key) !== -1);
        } else {
            res = _.values(data);
        }
        return _.orderBy(res, e => e.name, ['asc']);
    }

    computeTableOne() {
        const { sorted } = this.state;
        const list = this.computeList();
        return _.orderBy(computeTableOne(list), e => e[sorted.name].value, [sorted.value]);
    }

    computeTableTwo() {
        const { sorted } = this.state;
        const list = this.computeList();
        return _.orderBy(computeTableTwo(list), e => e[sorted.name].value, [sorted.value]);
    }

    handleCheckboxChange = (field, value) => {
        let filterList = _.clone(this.state.filterList);
        filterList[field] = value;  
        
        let res = {} ;
        if (value) {
            switch (field) {
                case IS_POOL_FILTER:
                    filterList[IS_SUPP_FILTER] = false;
                    res.autocomplete = _.clone(POOL_ID_LIST);
                    break;
                case IS_SUPP_FILTER:
                    filterList[IS_POOL_FILTER] = false;
                    res.autocomplete = _.clone(SUPP_ID_LIST);
                    break;
                default:
            }
        } else {
            res.autocomplete = [];
        }

        res.filterList = filterList;
        this.setState(res);
    }

    handleSortClick(name) {
        // Only the sort on the name column is handled atm
        if (name !== 'name') {
            return;
        }
        const sorted = _.clone(this.state.sorted);
        if (sorted.name === name) {
            sorted.value = sorted.value === 'asc' ? 'desc' : 'asc';
        } else {
            sorted.value = 'asc';
        }
        sorted.name = name;
        this.setState({ sorted });
    }

    handleAutocompleteChange(value) {
        this.setState({ autocomplete: value });
    }

    computeSource() {
        let list = _.values(this.state.data);
        let res = {};
        list.forEach(o => { res[o.key] = o.name; }); 
        return Object.keys(res).sort((a,b) => {
            if (res[a] < res[b]) return -1;
            if (res[a] > res[b]) return 1;
            return 0;
        });
    }

    handleTabChange(tabIndex) {
        this.setState({ tabIndex });
    }

    handleToggle = (param) => {
        this.setState({ [param]: !this.state[param] });
    }

    renderLeftBar() {
        const { version, filterList, autocomplete, navActive } = this.state;
        const { isSupp, isPool } = filterList;

        return (
            <NavDrawer                   
                onOverlayClick={this.handleToggle.bind(this, 'navActive')}
                clipped
                pinned={navActive}
            >
                <div data-app='left-bar'>
                    <div data-app='content'>
                        <IconButton icon='close' style={{float: 'right'}} onClick={this.handleToggle.bind(this, 'navActive')} />
                        <div data-app='filtre-list-titre'>{'Filters'}</div>
                        <Checkbox
                            checked={isPool}
                            label='My pool'
                            onChange={this.handleCheckboxChange.bind(this, IS_POOL_FILTER)}
                        />
                        <Checkbox
                            checked={isSupp}
                            label='Supports'
                            onChange={this.handleCheckboxChange.bind(this, IS_SUPP_FILTER)}
                        />
                        <div data-app='element-list-titre'>{'Elements'}</div>
                        <Autocomplete
                            direction='down'
                            label='Choose'
                            onChange={this.handleAutocompleteChange}
                            source={this.computeSource()}
                            selectedPosition='below'
                            value={autocomplete}
                        />
                    </div>
                    <div data-app='version'>
                        {'Data version: ' + version}
                    </div>
                </div>
            </NavDrawer>
        );
    }

    renderBar() { 
        return (
            <AppBar 
                title={TITLE} 
                fixed
                leftIcon='menu'
                onLeftIconClick={this.handleToggle.bind(this, 'navActive')}
            />
        );
    }

    renderContent() {
        const { sorted, tabIndex } = this.state;
        
        const list = this.computeList();
        const chartList = list.length > NB_MAX_ITEM_CHART ? list.slice(0, NB_MAX_ITEM_CHART) : list;
        const dataKeyList = computeDataKeyListLineChart(chartList);

        return (
            <Panel>
                <Tabs index={tabIndex} onChange={this.handleTabChange} fixed /*inverse*/>
                    <Tab label='statistics'>
                        <Table columns={COLUMNS} list={this.computeTableOne()} handleSortClick={this.handleSortClick} sorted={sorted} />
                    </Tab>
                    <Tab label='spells'>
                        <Table columns={COLUMNS_TWO} list={this.computeTableTwo()} handleSortClick={this.handleSortClick} sorted={sorted} />
                        <br />
                        <div data-app='footer'>{'Spells tooltips may still contain variable due to API issues(missing data).'}</div>
                    </Tab>
                    <Tab label='charts'>
                        <div data-app='chart-list'>
                            {_.map(BAR_CHART_LIST, o => (<BarChart key={o.title} title={o.title} data={computeBarChart(chartList, o.dataKeyList)} dataKeyList={o.dataKeyList} />))}
                            {_.map(LINE_CHART_LIST, o => (<LineChart key={o.stat} title={o.title} data={computeLineChart(chartList, o.stat, o.statPerLevel)} dataKeyList={dataKeyList} />))}
                        </div>
                        <br />
                        <div data-app='footer'>{'A maximum of ' + NB_MAX_ITEM_CHART + ' champions can be displayed at the same time.'}</div>
                    </Tab>
                </Tabs>
            </Panel>
        );
    }

    render() {       
        return (
            <div data-app='champion-list'>
                <Layout>
                    {this.renderLeftBar()}
                    {this.renderBar()}
                    {this.renderContent()}
                </Layout>
            </div>
        );
    }
}

Champions.displayName = 'Champions';
Champions.propTypes = {};
Champions.defaultProps = {};

export default Champions;
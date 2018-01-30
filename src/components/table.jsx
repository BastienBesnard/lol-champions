// Libs
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// React Toolbox components
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';

const SimpleTable = ({ columns, list, handleSortClick, sorted }) => {
    return (
        <div data-app='table'>
            <Table multiSelectable>
                <TableHead>
                    {_.map(columns, col => {
                        const props = { onClick: (...params) => handleSortClick(col.attr, ...params) };
                        if (col.attr === sorted.name) {
                            props.sorted = sorted.value;
                        }
                        return (<TableCell key={col.attr} {...props}>{col.name}</TableCell>);
                    })}
                </TableHead>
                {_.map(list, item => {
                    // Each row is an item of the list
                    const { key, selected } = item;
                    return (
                        <TableRow key={key} onSelect={() => { }} selectable={false} selected={selected}>
                            {_.map(columns, col => {
                                // Each cell is an attribute of the list (matching the columns attributes)
                                const { value, abbr } = item[col.attr];
                                return (
                                    <TableCell key={col.attr} onClick={() => {}}>
                                        {abbr ? <abbr title={abbr}>{value}</abbr> : value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </Table>
        </div>
    );
};

SimpleTable.displayName = 'SimpleTable';
SimpleTable.propTypes = {
    columns: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    handleSortClick: PropTypes.func.isRequired,
    sorted: PropTypes.object.isRequired
};
SimpleTable.defaultProps = {};

export default SimpleTable;
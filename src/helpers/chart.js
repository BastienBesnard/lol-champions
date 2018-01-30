function computeLineChartPerLevel(list, stat, statPerLevel) {
    let res = [];
    for(let i = 1; i <= 18; i++) {
        let obj = { name: i };
        list.forEach(element => {
            obj[element.key] = element[stat] + element[statPerLevel] * (i - 1);
        });
        res.push(obj);
    }
    return res;
};

export function computeLineChart(list, stat, statPerLevel) {
    let flatList = [];
    list.forEach(element => {
        const { key, stats } = element;
        flatList.push({
            key,
            ...stats
        });
    });
    return computeLineChartPerLevel(flatList, stat, statPerLevel);
}

export function computeBarChart(list, dataKeyList) {
    let res = [];   
    list.forEach(element => {
        const { name, stats } = element;
        let obj = { name };
        dataKeyList.forEach( o => {
            obj[o.dataKey] = stats[o.dataKey];
        });
        res.push(obj);
    });
    return res;
}

export function computeDataKeyListLineChart(list) {
    let res = [];
    list.forEach(element => {
        res.push({
            dataKey: element.key,
            name: element.name
        });
    });
    return res;
}
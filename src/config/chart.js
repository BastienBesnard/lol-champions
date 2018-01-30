export const BAR_CHART_LIST = [
    {
        title: 'Attack range - Move speed',
        dataKeyList: [
            {dataKey: 'attackrange', name: 'Attack range'}, // Column 1
            {dataKey: 'movespeed', name: 'Move speed'} // Column 2
        ]
    }
];

export const LINE_CHART_LIST = [
    {title: 'Armor', stat: 'armor', statPerLevel: 'armorperlevel'},
    {title: 'Attack damage', stat: 'attackdamage', statPerLevel: 'attackdamageperlevel'},
    {title: 'Attack speed', stat: 'attackspeedoffset', statPerLevel: 'attackspeedperlevel'},
    //Always equal to 0  {title: 'Critic', stat: 'crit', statPerLevel: 'critperlevel'},
    {title: 'HP', stat: 'hp', statPerLevel: 'hpperlevel'},
    {title: 'HP regen', stat: 'hpregen', statPerLevel: 'hpregenperlevel'},
    {title: 'MP', stat: 'mp', statPerLevel: 'mpperlevel'},
    {title: 'MP regen', stat: 'mpregen', statPerLevel: 'mpregenperlevel'},
    {title: 'Spell block', stat: 'spellblock', statPerLevel: 'spellblockperlevel'}
];
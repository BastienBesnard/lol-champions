// Libs
import _ from 'lodash';
// Config
import { POOL_ID_LIST } from '../config';

export function computeTableOne(list) {
    let res = [];

    list.forEach(o => {
        const { key, name, info, stats } = o;
        const { attack, defense, difficulty, magic } = info;
        const isSelected = _.findIndex(POOL_ID_LIST, str => str === key) !== -1;

        const {
            armor, armorperlevel,
            attackdamage, attackdamageperlevel,
            attackrange,
            attackspeedoffset, attackspeedperlevel,
            crit, critperlevel,
            hp, hpperlevel,
            hpregen, hpregenperlevel,
            movespeed,
            mp, mpperlevel,
            mpregen, mpregenperlevel,
            spellblock, spellblockperlevel
        } = stats;

        res.push({
            key: key,
            selected: isSelected,

            name: { value: name },
            difficulty: { value: difficulty },
            info: { value: (defense !== 10 ? '0' : '') + defense + '|' + (attack !== 10 ? '0' : '') + attack + '|' + (magic !== 10 ? '0' : '') + magic },
            armor: {
                value: armor + ' (' + armorperlevel + ')',
                abbr: armor + armorperlevel * 17
            },
            attackDamage: {
                value: attackdamage + ' (' + attackdamageperlevel + ')',
                abbr: attackdamage + attackdamageperlevel * 17
            },
            attackRange: { value: attackrange },
            attackSpeed: {
                value: attackspeedoffset + ' (' + attackspeedperlevel + ')',
                abbr: attackspeedoffset + attackspeedperlevel * 17
            },
            crit: {
                value: crit + ' (' + critperlevel + ')',
                abbr: crit + critperlevel * 17
            },
            hp: {
                value: hp + ' (' + hpperlevel + ')',
                abbr: hp + hpperlevel * 17
            },
            hpRegen: {
                value: hpregen + ' (' + hpregenperlevel + ')',
                abbr: hpregen + hpregenperlevel * 17
            },
            movespeed: { value: movespeed },
            mp: {
                value: mp + ' (' + mpperlevel + ')',
                abbr: mp + mpperlevel * 17
            },
            mpRegen: {
                value: mpregen + ' (' + mpregenperlevel + ')',
                abbr: mpregen + mpregenperlevel * 17
            },
            spellBlock: {
                value: spellblock + ' (' + spellblockperlevel + ')',
                abbr: spellblock + spellblockperlevel * 17
            }
        });
    });

    return res;
};

function computeSpellValue(spell) {
    return spell.name;
}

function computeSpellAbbr(spell) {
    const { sanitizedTooltip, resource, costBurn, cooldownBurn, effectBurn, vars, rangeBurn } = spell;

    // Compute tooltip
    let tooltip = sanitizedTooltip || '';
    let cost = resource || '';
    _.forEach(effectBurn, (str, i) => {
        tooltip = tooltip.replace(new RegExp('{{ e' + i + ' }}', 'g'), str);
        cost = cost.replace(new RegExp('{{ e' + i + ' }}', 'g'), str);
    });
    _.forEach(vars, o => {
        const { key, coeff } = o;
        tooltip = tooltip.replace(new RegExp('{{ ' + key + ' }}', 'g'), coeff);
        cost = cost.replace(new RegExp('{{ ' + key + ' }}', 'g'), coeff);
    });

    cost = cost.replace('{{ cost }}', costBurn);

    return 'Tooltip: ' + tooltip
        + '\n'
        + 'Cost: ' + cost
        + '\n'
        + 'CD: ' + cooldownBurn
        + '\n'
        + 'Range: ' + rangeBurn;
    //+ ranksWith + dyn + link + coeff;
}

function computeSpell(spell) {
    return {
        value: computeSpellValue(spell),
        abbr: computeSpellAbbr(spell)
    };
}

export function computeTableTwo(list) {
    let res = [];

    list.forEach(o => {
        const { key, name, allytips, enemytips, tags, partype, spells, passive } = o;
        const isSelected = _.findIndex(POOL_ID_LIST, str => str === key) !== -1;

        res.push({
            key: key,
            selected: isSelected,

            name: {
                value: name,
                abbr: 'Ally tips:\n' + allytips + '\n\nEnemy tips:\n' + enemytips
            },
            tags: { value: tags.join() + ' (' + partype + ')' },
            passive: {
                value: passive.name,
                abbr: passive.sanitizedDescription
            },
            spellOne: computeSpell(spells[0]),
            spellTwo: computeSpell(spells[1]),
            spellThree: computeSpell(spells[2]),
            spellFour: computeSpell(spells[3])
        });
    });

    return res;
};
define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Artillery Fabrication Tech reduces metal build costs of all artillery structures and mobile artillery units by 50%. Requires technology to build artillery structures and units.';
        },
        summarize: function(params) {
            return 'Artillery Fabrication Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png';
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 0;
            var dist = system.distance();
            if (dist > 0) {
                if (context.totalSize <= GW.balance.numberOfSystems[0]) {
                    chance = 100;
                    if (dist > 4)
                        chance = 50;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 100;
                    if (dist > 5)
                        chance = 50;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 100;
                    if (dist > 9)
                        chance = 50;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 28;
                    if (dist > 11)
                        chance = 50;
                }
                else {
                    chance = 28;
                    if (dist > 13)
                        chance = 50;
                }
            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/artillery_short/artillery_short.json',
                '/pa/units/land/artillery_long/artillery_long.json',
                '/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
                '/pa/units/land/bot_grenadier/bot_grenadier.json',
                '/pa/units/land/bot_sniper/bot_sniper.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 0.5
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

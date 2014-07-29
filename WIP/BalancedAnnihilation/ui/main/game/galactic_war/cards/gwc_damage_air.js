define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Air Ammunition Tech increases damage of all mobile air units by 25%';
        },
        summarize: function(params) {
            return 'Air Ammunition Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png';
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
                    chance = 12;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 12;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 24;
                    if (dist > 6)
                        chance = 120;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 24;
                    if (dist > 9)
                        chance = 120;
                }
                else {
                    chance = 24;
                    if (dist > 12)
                        chance = 120;
                }
            }

            return { chance: chance };

        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/air/bomber/bomber_ammo.json',
                '/pa/units/air/figher/fighter_ammo.json',
                '/pa/units/air/bomber_adv/bomber_adv_ammo.json',
                '/pa/units/air/figher_adv/figher_adv_ammo.json',
                '/pa/units/air/gunship/gunship_ammo.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

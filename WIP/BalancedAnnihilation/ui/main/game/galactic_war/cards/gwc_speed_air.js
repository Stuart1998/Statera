define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Air Engine Tech increases the speed of all air units by 25%';
        },
        summarize: function(params) {
            return 'Air Engine Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_air_engine.png';
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
                    chance = 16;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 16;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 32;
                    if (dist > 6)
                        chance = 166;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 32;
                    if (dist > 9)
                        chance = 166;
                }
                else {
                    chance = 32;
                    if (dist > 12)
                        chance = 166;
                }
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/air/fabrication_aircraft/fabrication_aircraft.json',
                '/pa/units/air/air_scout/air_scout.json',
                '/pa/units/air/bomber/bomber.json',
                '/pa/units/air/fighter/fighter.json',
                '/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
                '/pa/units/air/bomber_adv/bomber_adv.json',
                '/pa/units/air/fighter_adv/fighter_adv.json',
                '/pa/units/air/gunship/gunship.json',
                '/pa/units/air/transport/transport.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'move_speed',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: unit,
                    path: 'brake',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: unit,
                    path: 'acceleration',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: unit,
                    path: 'turn_speed',
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

define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Orbital Armor Tech increases health of all orbital units by 50%';
        },
        summarize: function(params) {
            return 'Orbital Armor Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_orbital.png';
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
                    chance = 14;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 14;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 28;
                    if (dist > 6)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 28;
                    if (dist > 9)
                        chance = 142;
                }
                else {
                    chance = 28;
                    if (dist > 12)
                        chance = 142;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/orbital/orbital_fighter/orbital_fighter.json',
                '/pa/units/orbital/orbital_lander/orbital_lander.json',
                '/pa/units/orbital/radar_satellite/radar_satellite.json',
                '/pa/units/orbital/solar_array/solar_array.json',
                '/pa/units/orbital/defense_satellite/defense_satellite.json',
                '/pa/units/orbital/orbital_laser/orbital_laser.json',
                '/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json',
                '/pa/units/orbital/orbital_factory/orbital_factory.json',
                '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

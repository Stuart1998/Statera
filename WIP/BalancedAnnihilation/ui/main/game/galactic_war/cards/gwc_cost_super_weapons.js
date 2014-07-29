define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Super Weapon Fabrication Tech reduces metal build costs of all nuclear missiles, Halley Rockets, and Orbital Lasers by 50%. Tech to build super weapons is required.';
        },
        summarize: function(params) {
            return 'Super Weapon Fabrication Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png';
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
                '/pa/units/land/nuke_launcher/nuke_launcher.json',
                '/pa/units/land/nuke_launcher/nuke_launcher_ammo.json',
                '/pa/units/orbital/delta_v_engine/delta_v_engine.json',
                '/pa/units/orbital/orbital_laser/orbital_laser.json',
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

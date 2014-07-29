define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return "Improved Energy Weapons tech reduces energy costs for energy based weapons by 75%";
        },
        summarize: function(params) {
            return 'Improved Energy Weapons';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
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
                    chance = 33;
                    if (dist > 4)
                        chance = 166;
                    else if (dist > 2)
                        chance = 333;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 33;
                    if (dist > 6)
                        chance = 166;
                    else if (dist > 3)
                        chance = 333;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 33;
                    if (dist > 9)
                        chance = 166;
                    else if (dist > 5)
                        chance = 333;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 33;
                    if (dist > 10)
                        chance = 166;
                    else if (dist > 6)
                        chance = 333;
                }
                else {
                    chance = 33;
                    if (dist > 12)
                        chance = 166;
                    else if (dist > 7)
                        chance = 333;
                }
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var weaps = [
                '/pa/units/orbital/ion_defense/ion_defense_tool_weapon.json',
                '/pa/units/orbital/orbital_laser/orbital_laser_tool_weapon.json',
                '/pa/units/land/artillery_short/artillery_short_tool_weapon.json',
                '/pa/units/land/artillery_long/artillery_long_tool_weapon.json',
                '/pa/units/land/tactical_missile_launcher/tactical_missile_launcher_tool_weapon.json',
                '/pa/units/air/bomber/bomber_tool_weapon.json',
                '/pa/units/air/bomber_adv/bomber_adv_tool_weapon.json',
                '/pa/units/sea/missile_ship/missile_ship_tool_weapon.json',
                '/pa/tools/uber_cannon/uber_cannon.json'
            ];
            var mods = [];
            var modWeap = function (weap) {
                mods.push({
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 0.25
                });
                mods.push({
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 0.25
                });
                mods.push({
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 0.25
                });
            };
            _.forEach(weaps, modWeap);
            
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

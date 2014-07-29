define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Vehicle Combat Tech increases speed of all vehicles by 50%, health by 50%, and damage by 25%';
        },
        summarize: function(params) {
            return 'Vehicle Combat Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png';
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
                    chance = 28;
                    if (dist > 4)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 28;
                    if (dist > 6)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 28;
                    if (dist > 9)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 28;
                    if (dist > 11)
                        chance = 142;
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
                '/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
                '/pa/units/land/tank_light_laser/tank_light_laser.json',
                '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
                '/pa/units/land/tank_armor/tank_armor.json',
                '/pa/units/land/land_scout/land_scout.json',
                '/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
                '/pa/units/land/tank_laser_adv/tank_laser_adv.json',
                '/pa/units/land/tank_heavy_armor/tank_heavy_armor.json',
                '/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
				'/pa/units/land/tank_attack/tank_attack.json',
				'/pa/units/land/tank_amphibious_adv/tank_amphibious_adv.json',
				'/pa/units/land/tank_heavy_artillery/tank_heavy_artillery.json',
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'move_speed',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'brake',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'acceleration',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'turn_speed',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                });
            };
            _.forEach(units, modUnit);
            var ammos = [
                '/pa/units/land/tank_light_laser/tank_light_laser_ammo.json',
                '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle_ammo.json',
                '/pa/units/land/tank_armor/tank_armor_ammo.json',
                '/pa/units/land/land_scout/land_scout_ammo.json',
                '/pa/units/land/tank_laser_adv/tank_laser_adv_ammo.json',
                '/pa/units/land/tank_heavy_armor/tank_heavy_armor_ammo.json',
            ];
            var modAmmo = function (ammo) {
                mods.push({
                    file: ammo,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(ammos, modAmmo);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

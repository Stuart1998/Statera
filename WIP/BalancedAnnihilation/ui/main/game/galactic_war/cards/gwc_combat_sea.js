define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Naval Combat Tech increases speed of all naval units by 50%, health by 50%, and damage by 25%';
        },
        summarize: function(params) {
            return 'Naval Combat Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_naval.png';
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
                else  {
                    chance = 28;
                    if (dist > 13)
                        chance = 142;
                }
            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/sea/fabrication_ship/fabrication_ship.json',
                '/pa/units/sea/frigate/frigate.json',
                '/pa/units/sea/destroyer/destroyer.json',
                '/pa/units/sea/sea_scout/sea_scout.json',
				'/pa/units/sea/attack_boat/attack_boat.json',
				'/pa/units/sea/fabrication_boat_combat/fabrication_boat_combat.json',
                '/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json',
                '/pa/units/sea/missile_ship/missile_ship.json',
                '/pa/units/sea/battleship/battleship.json',
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
                '/pa/units/sea/frigate/frigate_ammo_shell.json',
                '/pa/units/sea/frigate/frigate_ammo_aa.json',
                '/pa/units/sea/destroyer/destroyer_ammo.json',
                '/pa/units/sea/destroyer/destroyer_torpedo_ammo.json',
                '/pa/units/sea/sea_scout/sea_scout_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_aa_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_ammo.json',
                '/pa/units/sea/battleship/battleship_ammo.json',
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

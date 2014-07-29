define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Air Combat Tech increases the speed of all air units by 25%, health by 50%, and damage by 25%';
        },
        summarize: function(params) {
            return 'Air Combat Tech';
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
                        chance = 142;
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
				'/pa/units/air/gunship_basic/gunship_basic.json',
                '/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
                '/pa/units/air/bomber_adv/bomber_adv.json',
                '/pa/units/air/fighter_riot/fighter_riot.json',
				'/pa/units/air/bomber_naval/bomber_naval.json',
                '/pa/units/air/gunship/gunship.json',
                '/pa/units/air/transport/transport.json',
				'/pa/units/air/transport_large/transport_large.json',
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
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                });
            };
            _.forEach(units, modUnit);
            var ammos = [
                '/pa/units/air/bomber/bomber_ammo.json',
                '/pa/units/air/figher/fighter_ammo.json',
                '/pa/units/air/bomber_adv/bomber_adv_ammo.json',
                '/pa/units/air/figher_adv/figher_adv_ammo.json',
                '/pa/units/air/gunship/gunship_ammo.json',
            ];
            var ammoMod = function (ammo) {
                mods.push({
                    file: ammo,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(ammos, ammoMod);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

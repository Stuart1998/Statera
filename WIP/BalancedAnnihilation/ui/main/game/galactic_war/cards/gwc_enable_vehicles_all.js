define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Complete Vehicle tech enables building of all Vehicle and all Vehicle Factories. Basic Vehicle factories are build via your commander or any basic fabricator. Advanced Vehicle factories are build via basic or advanced vehicle fabricators.';
        },
        summarize: function(params) {
            return 'Complete Vehicle Tech';
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
                    chance = 500;
                    if (dist > 2)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 500;
                    if (dist > 3)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 50;
                    if (dist > 5)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 50;
                    if (dist > 6)
                        chance = 62;
                }
                else {
                    chance = 50;
                    if (dist > 7)
                        chance = 62;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
                '/pa/units/land/vehicle_factory/vehicle_factory.json',
                '/pa/units/land/tank_light_laser/tank_light_laser.json',
                '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
                '/pa/units/land/tank__heavy_armor/tank_heavy_armor.json',
				'/pa/units/land/tank_attack/tank_attack.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});

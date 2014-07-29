define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Basic Orbital Tech enables the building of basic orbital units. Basic orbital units are built from an Orbital Launcher.';
        },
        summarize: function(params) {
            return 'Basic Orbital Tech';
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
                    chance = 50;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 50;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 181;
                    if (dist > 5)
                        chance = 45;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 181;
                    if (dist > 6)
                        chance = 45;
                }
                else {
                    chance = 181;
                    if (dist > 7)
                        chance = 45;
                }
            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/orbital/orbital_fighter/orbital_fighter.json',
                '/pa/units/orbital/radar_satellite/radar_satellite.json',
                '/pa/units/orbital/solar_array/solar_array.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});

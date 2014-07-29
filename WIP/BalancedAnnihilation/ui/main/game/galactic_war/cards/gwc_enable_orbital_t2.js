define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Advanced Orbital Tech enables the building of orbital fabricators and orbital factories. Orbital fabricators are built via the orbital launcher and orbital factories build by the orbital fabricators.';
        },
        summarize: function(params) {
            return 'Advanced Orbital Tech';
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
                '/pa/units/orbital/orbital_factory/orbital_factory.json',
                '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json',
                '/pa/units/orbital/orbital_laser/orbital_laser.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});

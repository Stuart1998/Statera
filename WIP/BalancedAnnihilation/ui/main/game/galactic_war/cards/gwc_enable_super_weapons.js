define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Super Weapon Tech enables nuclear missiles, orbital lasers, and planetary engines to be built. An advanced fabricator is required to build super weapons.';
        },
        summarize: function(params) {
            return 'Super Weapon Tech';
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
                    chance = 181;
                    if (dist < 2)
                        chance = 45;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 181;
                    if (dist < 3)
                        chance = 45;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 181;
                    if (dist < 5)
                        chance = 45;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 181;
                    if (dist < 6)
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
                '/pa/units/land/nuke_launcher/nuke_launcher.json',
                '/pa/units/orbital/orbital_laser/orbital_laser.json',
                '/pa/units/orbital/delta_v_engine/delta_v_engine.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});

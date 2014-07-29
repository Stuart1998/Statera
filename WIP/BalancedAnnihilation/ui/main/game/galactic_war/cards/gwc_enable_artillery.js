define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Activates artillery technology for artillery defenses and mobile artillery units.';
        },
        summarize: function(params) {
            return 'Artillery Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png';
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
                    chance = 250;
                    if (dist > 2)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 250;
                    if (dist > 3)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 250;
                    if (dist > 5)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 250;
                    if (dist > 6)
                        chance = 62;
                }
                else {
                    chance = 250;
                    if (dist > 7)
                        chance = 62;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/artillery_long/artillery_long.json',
                '/pa/units/land/artillery_short/artillery_short.json',
                '/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
                '/pa/units/land/bot_arty/bot_arty.json',
                '/pa/units/land/bot_sniper/bot_sniper.json',
				'/pa/units/land/tank_heavy_artillery/tank_heavy_artillery.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});

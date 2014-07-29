define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Advanced Bot tech enables building of Advanced Bots and Advanced Bot Factories. Advanced Bot factories are built via advanced bot fabricators.';
        },
        summarize: function(params) {
            return 'Advanced Bot Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
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
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});

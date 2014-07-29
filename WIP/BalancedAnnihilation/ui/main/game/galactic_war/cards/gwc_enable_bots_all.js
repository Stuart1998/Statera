define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Complete Bot tech enables building of all Bots and all Bot Factories. Basic Bot factories are built via your commander or any basic fabricator. Advanced Bot factories are built via basic or advanced bot fabricators.';
        },
        summarize: function(params) {
            return 'Complete Bot Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_factory.png';
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
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json',
                '/pa/units/land/bot_factory/bot_factory.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});

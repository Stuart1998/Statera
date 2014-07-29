define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Complete air tech enables building of all mobile air units and factories. Basic air factories are built via your commander or any basic fabricator. Advanced factories are built via a basic or advanced vehicle fabricator.';
        },
        summarize: function(params) {
            return 'Complete Air Tech';
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
                    chance = 14;
                    if (dist > 5)
                        chance = 71;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 14;
                    if (dist > 6)
                        chance = 71;
                }
                else {
                    chance = 14;
                    if (dist > 7)
                        chance = 71;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/air/air_factory/air_factory.json',
                '/pa/units/air/air_factory_adv/air_factory_adv.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});

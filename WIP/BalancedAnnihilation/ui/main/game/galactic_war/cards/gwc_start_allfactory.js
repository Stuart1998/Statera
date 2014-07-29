define([
    'module',
    'shared/gw_common',
    'cards/gwc_start'
], function (
    module,
    GW,
    GWCStart
) {
    var CARD = { id: /[^\/]+$/.exec(module.id).pop() };

    return {
        visible: function (params) { return false; },
        summarize: function (params) {
            return 'Assault Commander';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return 'The Assault Commander loadout contains all basic factories and units but no basic defenses.'; },
        hint: function () {
            return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: 'Only Inquisitor Nemicus knows the data for this assault focused loadout. Find it on Patagonia.'
            };
        },
        deal: function (system) {
            return {
                params: {
                    allowOverflow: true
                },
                chance: 0
            };
        },
        buff: function (inventory) {
            if (inventory.lookupCard(CARD) === 0) {
                // Make sure we only do the start buff/dull once
                var buffCount = inventory.getTag('', 'buffCount', 0);
                if (!buffCount) {
                    GWCStart.buff(inventory);
                    inventory.addUnits([
                        '/pa/units/land/vehicle_factory/vehicle_factory.json',
                        '/pa/units/land/tank_light_laser/tank_light_laser.json',
                        '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
                        '/pa/units/land/tank_heavy_armor/tank_heavy_armor.json',
                        '/pa/units/land/bot_factory/bot_factory.json',
                        '/pa/units/air/air_factory/air_factory.json',
                        '/pa/units/sea/naval_factory/naval_factory.json',
                    ]);
                    inventory.removeUnits([
                        '/pa/units/land/land_barrier/land_barrier.json',
                        '/pa/units/land/air_defense/air_defense.json',
                        '/pa/units/land/laser_defense_single/laser_defense_single.json',
                        '/pa/units/land/laser_defense/laser_defense.json',
						'/pa/units/land/rocket_defense/rocket_defense.json',
						'/pa/units/land/laser_defense_single/laser_defense_single.json',
                        '/pa/units/sea/torpedo_launcher/torpedo_launcher.json',
                        '/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json',
                    ]);
                }
                else {
                    // Don't clog up a slot.
                    inventory.maxCards(inventory.maxCards() + 1);
                }
                ++buffCount;
                inventory.setTag('', 'buffCount', buffCount);
            }
            else {
                // Don't clog up a slot.
                inventory.maxCards(inventory.maxCards() + 1);
                GW.bank.addStartCard(CARD);
            }
        },
        dull: function (inventory) {
            if (inventory.lookupCard(CARD) === 0) {
                var buffCount = inventory.getTag('', 'buffCount', 0);
                if (buffCount) {
                    // Perform dulls here
                    
                    inventory.setTag('', 'buffCount', undefined);
                }
            }
        }
    };
});

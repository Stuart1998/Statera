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
            return 'Orbital Commander';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return 'The Orbital Commander loadout contains all orbital units and factories.'; },
        hint: function () {
            return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: 'Defeat First Seeker Osiris on Alenquer, then, and only then, you will find this high flying loadout.'
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
                        '/pa/units/orbital/orbital_fighter/orbital_fighter.json',
                        '/pa/units/orbital/radar_satellite/radar_satellite.json',
                        '/pa/units/orbital/solar_array/solar_array.json',
                        '/pa/units/orbital/orbital_factory/orbital_factory.json',
                        '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json',
                        '/pa/units/orbital/defense_satellite/defense_satellite.json',
                        '/pa/units/orbital/orbital_laser/orbital_laser.json',
                        '/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json',
                    ]);
                    var units = [
                        '/pa/units/orbital/orbital_launcher/orbital_launcher.json',
                    ];
                    var mods = [];
                    var modUnit = function (unit) {
                        mods.push({
                            file: unit,
                            path: 'unit_types',
                            op: 'replace',
                            value: [
                                "UNITTYPE_Orbital",
                                "UNITTYPE_Factory",
                                "UNITTYPE_Construction",
                                "UNITTYPE_Structure",
                                "UNITTYPE_Land",
                                "UNITTYPE_FabBuild",
                                "UNITTYPE_FabAdvBuild",
                                "UNITTYPE_CmdBuild"
                            ],
                        });
                    };
                    _.forEach(units, modUnit);
                    inventory.addMods(mods);
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

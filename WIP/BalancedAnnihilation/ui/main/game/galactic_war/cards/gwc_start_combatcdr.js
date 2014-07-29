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
            return 'Bionic Augmentation Commander Of Networking';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return 'The Bionic Augmentation Commander Of Networking (BACON) loadout contains only one data bank but increases the Commander\'s weapon rate of fire by 100%, decreases Uber Cannon energy usage to by 75%, increases health by 200%, and increases speed by 300%.'; },
        hint: function () {
        return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: 'Commander Invictus has this powerful loadout hidden away on the Entara system.'
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
                    inventory.maxCards(inventory.maxCards() - 1);
                    var units = [
                        '/pa/units/commanders/base_commander/base_commander.json',
                    ];
                    var mods = [];
                    var modUnit = function (unit) {
                        mods.push({
                            file: unit,
                            path: 'move_speed',
                            op: 'multiply',
                            value: 4
                        });
                        mods.push({
                            file: unit,
                            path: 'brake',
                            op: 'multiply',
                            value: 4
                        });
                        mods.push({
                            file: unit,
                            path: 'acceleration',
                            op: 'multiply',
                            value: 4
                        });
                        mods.push({
                            file: unit,
                            path: 'turn_speed',
                            op: 'multiply',
                            value: 4
                        });
                        mods.push({
                            file: unit,
                            path: 'max_health',
                            op: 'multiply',
                            value: 3.0
                        });
                    };
                    _.forEach(units, modUnit);
                    var weaps = [
                        '/pa/tools/uber_cannon/uber_cannon.json',
                        '/pa/units/commanders/base_commander/base_commander_tool_weapon.json',
                    ];
                    var modWeap = function (weap) {
                        mods.push({
                            file: weap,
                            path: 'ammo_capacity',
                            op: 'multiply',
                            value: 0.25
                        });
                        mods.push({
                            file: weap,
                            path: 'ammo_demand',
                            op: 'multiply',
                            value: 0.25
                        });
                        mods.push({
                            file: weap,
                            path: 'ammo_per_shot',
                            op: 'multiply',
                            value: 0.25
                        });
                        mods.push({
                            file: weap,
                            path: 'rate_of_fire',
                            op: 'multiply',
                            value: 2.0
                        });
                    };
                    _.forEach(weaps, modWeap);
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

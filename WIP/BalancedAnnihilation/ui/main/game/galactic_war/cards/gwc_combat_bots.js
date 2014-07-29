define(['shared/gw_common'], function(GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return 'Bot Combat Tech increases health of all bots by 50%, damage by 25%, and speed by 50%';
        },
        summarize: function(params) {
            return 'Bot Combat Tech';
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
                    chance = 28;
                    if (dist > 4)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 28;
                    if (dist > 6)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 28;
                    if (dist > 9)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 28;
                    if (dist > 11)
                        chance = 142;
                }
                else {
                    chance = 28;
                    if (dist > 13)
                        chance = 142;
                }

            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/fabrication_bot/fabrication_bot.json',
                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json',
                '/pa/units/land/assault_bot/assault_bot.json',
				'/pa/units/land/bot_arty/bot_arty/json',
				'/pa/units/land/amphibious_bot/amphibious_bot.json',
                '/pa/units/land/bot_grenadier/bot_grenadier.json',
                '/pa/units/land/bot_tactical_missile/bot_tactical_missile.json',
                '/pa/units/land/bot_bomb/bot_bomb.json',
                '/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
                '/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json',
                '/pa/units/land/assault_bot_adv/assault_bot_adv.json',
                '/pa/units/land/bot_sniper/bot_sniper.json',
				'/pa/units/land/bot_aa_adv/bot_aa_adv.json',
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'move_speed',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'brake',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'acceleration',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'turn_speed',
                    op: 'multiply',
                    value: 1.5
                });
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                });
            };
            _.forEach(units, modUnit);
            var ammos = [
                '/pa/units/land/assault_bot/assault_bot_ammo.json',
                '/pa/units/land/bot_tactical_missile/bot_tactical_missile_ammo.json',
                '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                '/pa/units/land/assault_bot_adv/assault_bot_adv_ammo.json',
                '/pa/units/land/bot_sniper/bot_sniper_ammo.json',
            ];
            var ammoMod = function (ammo) {
                mods.push({
                    file: ammo,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(ammos, ammoMod);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});

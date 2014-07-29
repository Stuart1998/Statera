define([
    'shared/gw_common',
    'shared/gw_factions'
], function(
    GW,
    GWFactions
) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            var minion = params.minion;
            var result = 'Adds a Sub Commander that will join you in battles.<br>';
            result += '<br>Name: ' + minion.name;
            if (minion.color) {
                result += '<br>Favorite color: <div class="colorswatch" style="background-color: rgb(' + minion.color[0].join(',') + ')"></div>';
            }
            if (minion.econ_rate && minion.econ_rate != 1) {
                result += '<br>Economy boost: ' + Math.round(minion.econ_rate * 100 - 100).toString() + '%';
            }
            return result;
        },
        summarize: function(params) {
            return 'Sub Commander';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        getContext: function (galaxy, inventory) {
            return {
                chance: 100,
                totalSize: galaxy.stars().length,
                faction: inventory.getTag('global', 'playerFaction') || 0
            };
        },
        deal: function (system, context) {
            var minion = _.sample(GWFactions[context.faction].minions);
            return {
                params: {
                    minion: minion,
                },
                chance: system.distance() > 0 ? context.chance : 0
            };
        },
        buff: function(inventory, params) {
            // Note: Storing only the name allows changing the parameters, which
            // is easier for testing.  Every time the cards get re-applied, the
            // minion parameters will be updated.
            var minion = params.minion;
            inventory.minions.push(minion);
            if (minion.commander && minion.commander.UnitSpec)
                inventory.addUnits([minion.commander.UnitSpec]);
        },
        dull: function(inventory) {
        },
        keep: function (params, context) {
            //console.log("Sub CDR: KEEP");
            context.chance = 50;
        },
        discard: function (params, context) {
            context.chance *= Math.log(context.totalSize) * 0.15;
            //console.log("discard: chance: " + context.chance);
        },
    };
});

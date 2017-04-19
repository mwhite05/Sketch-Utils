/**
 * @author Michael White
 * @copyright 2017 Freckle, LLC
 */

function _getAllLayersInDocument(document) {
    var allLayers = [];

    var pages = document.pages();
    for(var i = 0; i < pages.count(); i++) {
        var page = pages[i];
        var artboards = page.artboards();

        for(var z = 0; z < artboards.count(); z++) {
            var artboard = artboards[z];
            var layers = artboard.layers();

            for(var k = 0; k < layers.count(); k++) {
                allLayers.push(layers[k]);
            }
        }
    }

    return allLayers;
}


/**
 * This is the method called when the user runs the plugin from the menu or keyboard shortcut.
 *
 * @param context
 */
function command_fixSymbolLayerNames(context) {
    var layers = _getAllLayersInDocument(context.document);

    for(var i=0; i < layers.length; i++) {
        var layer = layers[i];
        if(!isSymbolInstance(layer)) {
            continue; // Skip this layer, it's not a symbol
        }
        var layerName = layer.name();
        //get the name of the symbol on the layer
        var symbolName = layer.symbolMaster().name();

        //only change the name of layers that don't match the symbol name
        if(layerName != symbolName) {
            //set the layer name to the symbol name
            layer.setName(symbolName);
        }
    }
}

/**
 * Utility to determine whether the specified layer is a symbol of any kind (master or instance)
 *
 * @param layer
 * @returns {boolean}
 */
function isSymbol(layer) {
    var className = layer.class();
    return className == 'MSSymbolMaster' || className == 'MSSymbolInstance';
}

/**
 * Utility to determine whether the specified layer is a symbol instance (not a master)
 *
 * @param layer
 * @returns {boolean}
 */
function isSymbolInstance(layer) {
    var className = layer.class();
    return className == 'MSSymbolInstance';
}

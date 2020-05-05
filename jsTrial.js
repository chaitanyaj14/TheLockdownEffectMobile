var bands = [ 'B2', 'B3', 'B4','B8', 'B5'];
var S2 = ee.ImageCollection('COPERNICUS/S2')
        .filterBounds(kaveriT)
        .select(bands);
//filter start and end date
var kaveri = S2.filterDate('2020-03-1', '2020-03-10');
var kaveri2 = S2.filterDate('2020-03-30', '2020-04-07');
var kaveri3 = S2.filterDate('2019-03-25', '2019-04-01');
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B8', 'B4', 'B3'],
  gamma: [0.95, 1.1, 1]
};
var ndwi1 = kaveri.mean().normalizedDifference(['B4', 'B3']);
var ndwi2 = kaveri2.mean().normalizedDifference(['B4', 'B3']);
var ndwi3 = kaveri3.mean().normalizedDifference(['B4', 'B3']);
var ndwi11 = kaveri.mean().normalizedDifference(['B3', 'B8']);
var ndwi21 = kaveri2.mean().normalizedDifference(['B3', 'B8']);
var ndwi31 = kaveri3.mean().normalizedDifference(['B3', 'B8']);
var waterPalette = ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff'];
//Map.addLayer(ndwi1, {min: -0.3, max: 0.3, palette: waterPalette}, 'ndwi1');
//Map.addLayer(ndwi2, {min: -0.3, max: 0.3, palette: waterPalette}, 'ndwi2');
//Map.addLayer(ndwi3, {min: -0.3, max: 0.3, palette: waterPalette}, 'ndwi3');
var vis = {min: -0.3, max: 0.3, palette: waterPalette}
print(kaveri)
print(kaveri2)
var mask1 = ndwi11.gte(0);
var mask2 = ndwi21.gte(0);
var mask3 = ndwi31.gte(0);

Map.setCenter(78.6884, 10.8639, 12);

Map.addLayer(ndwi3.updateMask(mask3),vis,'2019March31', 0);
Map.addLayer(ndwi1.updateMask(mask1),vis,'2020March16', 0);
Map.addLayer(ndwi2.updateMask(mask2),vis,'2020March31', 0);

//Map.addLayer(kaveri, rgbVis, 'kaveri');
//Map.addLayer(kaveri2, rgbVis, 'kaveri2');

//
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});


// Create legend title
var legendTitle = ui.Label({
  value: 'NDTI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});

 // Add the title to the panel
legend.add(legendTitle);

// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
var legendImage = gradient.visualize(vis);

// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(vis['max'])
    ],
  });

legend.add(panel);

// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
  params: {bbox:'0,0,10,100', dimensions:'10x200'}, 
  style: {padding: '1px', position: 'bottom-center'}
});

// add the thumbnail to the legend
legend.add(thumbnail);

// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(vis['min'])
    ],
  });

legend.add(panel);

Map.add(legend);
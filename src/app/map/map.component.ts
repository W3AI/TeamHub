import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor() { }

ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    // TODO - [ ] - change center to user LonLat
    this.view = new OlView({
      center: fromLonLat([24.9667, 45.85]),
      zoom: 1.2
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

}

/* global process, L */

const
  apiVersion = process.env.VERSION || '',
  baseApiUrl = process.env.API_URL || '',
  old = !!process.env.OLD,
  apiUrl = baseApiUrl,// + apiVersion + '/'
  southWest = L.latLng(30, 10),
  northEast = L.latLng(80, 200),
  maxBounds = L.latLngBounds(southWest, northEast)
  ;

export const config = {
  apiVersion,
  apiUrl,
  old,
  mapOptions: {
    minZoom: 4,
    maxZoom: 18,
    maxBounds
  },
  tileProvider: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  defaultViewOptions: {
    lat: '54.908593335436926',
    lng: '83.0291748046875',
    zoom: 12,
  },
  defaultBusListSync: {
    tsp: 0,
    version: '',
    list: []
  },
  keys: {
    localViewParams: 'stored-coordinates',
    busListSync: 'bus-list-sync',
    busSearch: 'bus-search',
  },
  syncPeriod: 1000 * 60 * 60 * 24,  // check bus list and routes every 24 hours
  historyDisplayLimit: 5,
};

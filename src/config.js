/* global process, L */

const
  apiVersion = process.env.VERSION || '',
  baseApiUrl = process.env.API_URL || '',
  apiUrl = baseApiUrl,// + apiVersion + '/'
  southWest = L.latLng(30, 10),
  northEast = L.latLng(80, 200),
  maxBounds = L.latLngBounds(southWest, northEast)
  ;

export const config = {
  apiVersion,
  apiUrl,
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
  keys: {
    localViewParams: 'stored-coordinates'
  }
};

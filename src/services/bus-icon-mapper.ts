import { BusCodes } from 'src/types/enums';

export function getBusIcon(busCode: BusCodes): string {
  switch (busCode) {
    case BusCodes.BUS:
      return require('src/assets/bus.png');

    case BusCodes.TROLLEY:
      return require('src/assets/trolley.png');

    case BusCodes.TRAM:
      return require('src/assets/tram.png');

    case BusCodes.SHUTTLE:
      return require('src/assets/minibus.png');

    default:
      console.error(`Unknown bus code ${busCode}`);
      return '';
  }
}

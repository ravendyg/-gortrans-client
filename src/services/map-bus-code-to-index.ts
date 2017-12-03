import { BusCodes } from 'src/types/enums';

export function mapBusCodeToIndex(code: BusCodes): number {
  switch (code) {
    case BusCodes.TROLLEY: return 1;
    case BusCodes.TRAM: return 2;
    case BusCodes.SHUTTLE: return 3;
    default: return 0;
  }
}

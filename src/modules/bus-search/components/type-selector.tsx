import * as React from 'react';
import { Connected } from 'src/components/connected';
import { IBusSearchModuleStateParticle, IBusSearchModuleStore, IBusSearchState } from 'src/modules/bus-search/types';
import { TypeBtn } from './type-btn';
import { stringComparator } from 'src/services/comparators';
import { BusCodes } from 'src/types/enums';

interface ITypeSelectorState extends IBusSearchState {}

export interface ITypeSelectorProps {
  store: IBusSearchModuleStore;
  getBusIcon: (busCode: BusCodes) => string;
  updateType: (busCode: BusCodes) => void;
}

export const selector = 'search-type-selector';

export class TypeSelector extends Connected<ITypeSelectorProps, ITypeSelectorState, IBusSearchModuleStateParticle> {

  private _oldState: IBusSearchState;

  mapState(newState: IBusSearchModuleStateParticle) {
    console.log(newState);
    return newState.busSearch !== this._oldState ?
      newState.busSearch :
      null
      ;
  }

  render() {
    const
      {getBusIcon, store, updateType} = this.props,
      codes = Object.keys(this.state.lists).sort(stringComparator),
      {activeTab} = this.state,
      textProvider = store.getState().translation.translation
      ;
    return(
      <div
        className="search__type-selector"
        data-test-id={selector}
      >
        {codes.map(code => {
          const busCode = code as BusCodes;
          return <TypeBtn
            key={busCode}
            image={getBusIcon(busCode)}
            emit={() => updateType(busCode)}
            active={activeTab === busCode}
            title={textProvider(`vehicle-name-${busCode}`)}
          />;
          }
        )}
      </div>
    );
  }
}

import * as React from 'react';
import { Connected } from '../../../components/connected';
import { IBusSearchModuleStateParticle, IBusSearchModuleStore } from '../types';

interface ITypeSelectorState {}

export interface ITypeSelectorProps {
  store: IBusSearchModuleStore;
}

export const selector = 'bus-search-type-selector';

export class TypeSelector extends Connected<ITypeSelectorProps, ITypeSelectorState, IBusSearchModuleStateParticle> {

  mapState(newState: IBusSearchModuleStateParticle) {
    console.log(newState);
    return this.state;
  }

  render() {
    return(
      <div data-test-id={selector}>icons</div>
    );
  }
}

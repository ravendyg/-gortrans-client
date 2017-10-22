import * as React from 'react';
import { Connected } from './connected';
import { IPropsWithAction } from '../types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './map-wrapper/map-wrapper';
import { Controls } from './controls/controls';
import { IStore, IReduxState } from '../types/state';
import { IWindowProps } from '../types';

import { SidePanel } from './side-panel';

interface IAppState {
  panelContent: JSX.Element | null;
}

export interface IAppProps extends IPropsWithAction, IWindowProps {
  mapProps: IMapWrapperProps;
  store: IStore<IReduxState>;
}

export class App extends Connected<IAppProps, IAppState> {

  mapState(): IAppState {
    return {
      panelContent: this.props.actions.mapRouterStateToPanelState(this.props.store)
    };
  }

  render() {
    const
      controls = !this.state.panelContent
        ? <Controls actions={this.props.actions} />
        : null
        ,
      sidePanel = this.state.panelContent
        ? (
          <SidePanel
            children={this.state.panelContent}
            closeMe={this.props.actions.controlActions.goToRoot}
            slideLength={'0.5s'}
            win={this.props.win}
          />
        )
        : null
      ;

    return(
      <div id="wrapper">
        <MapWrapperComponent {...this.props.mapProps} />
        {controls}
        {sidePanel}
      </div>
    );
  }

}

import * as React from 'react';
import { Connected } from './connected';
import { IPropsWithAction } from '../types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './map-wrapper/map-wrapper';
import { Controls } from './controls/controls';
import { IStore, IReduxState } from '../types/state';
import { RouterState } from '../types/data-types';
import { IWindowProps } from '../types';
import { Settings } from './settings/settings';
import { Search } from './search/search';
import { SidePanel } from './side-panel';

export declare type PanelContent = JSX.Element | null;

interface IAppState {
  panelContent: PanelContent;
}

export interface IAppProps extends IPropsWithAction, IWindowProps {
  mapProps: IMapWrapperProps;
  store: IStore<IReduxState>;
}

function mapRouterStateToPanelState(
  routerState: RouterState, props: IAppProps
): PanelContent {
  switch (routerState) {
    case RouterState.SEARCH: {
      return <Search
        actions={props.actions}
        store={props.store}
      />;
    }

    case RouterState.SETTINGS: {
      return <Settings />;
    }

    default: {
      return null;
    }
  }
}

export function mapState(
  newState: IReduxState, props: IAppProps
): IAppState {
  return {
    panelContent: mapRouterStateToPanelState(
      newState.appState.routerState, props
    ),
  };
}

export class App extends Connected<IAppProps, IAppState> {

  mapState(newState: IReduxState): IAppState {
    return mapState(newState, this.props);
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

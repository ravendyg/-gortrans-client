import * as React from 'react';
import {connect} from 'react-redux';
import { IPropsWithAction } from '../types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './map-wrapper/map-wrapper';
import { Controls } from './controls/controls';
import { IWindowProps, IStoreProps } from '../types';
import { IReduxState } from '../types/state';

import { mapRouterStateToPanelState } from 'src/services/panel-content';

import { SidePanel } from './side-panel';
import { Dispatch } from 'redux';

export interface IUnconnectedProps extends IPropsWithAction, IWindowProps, IStoreProps {
  mapProps: IMapWrapperProps;
}

interface IStateProps {
  panelContent: JSX.Element | null;
}

interface IDispatchProps {

}

export interface IAppProps extends IUnconnectedProps, IStateProps, IDispatchProps {}

export const AppUnconnected = (props: IAppProps) => {
  console.log(props);
  const
    { actions, mapProps, win, panelContent } = props,
    controls = !panelContent
      ? <Controls actions={actions} />
      : null
      ,
    sidePanel = panelContent
      ? (
        <SidePanel
          closeMe={actions.controlActions.goToRoot}
          slideLength={'0.5s'}
          win={win}
        >{panelContent}</SidePanel>
      )
      : null
    ;

  return(
    <div id="wrapper">
      <MapWrapperComponent {...mapProps} />
      {controls}
      {sidePanel}
    </div>
  );
};

const mapStateToProps = (state: IReduxState, ownProps: IAppProps): IStateProps => {
  console.log(state);
  return {
    // need to have access to the store itself to inject new reducers
    panelContent: mapRouterStateToPanelState(ownProps.store),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  console.log(dispatch);
  return {
  };
};

const mergeProps = (stateProps: IStateProps, dispatchProps: IDispatchProps, ownProps: IUnconnectedProps): IAppProps => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

export const App = connect<IStateProps, IDispatchProps, IUnconnectedProps, any, IReduxState>(
  mapStateToProps, mapDispatchToProps, mergeProps)(AppUnconnected);

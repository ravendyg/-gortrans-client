import { connectToApi } from '../../actions/connect-to-api';
import { createControlsComponent } from './create-controls';

export const ControlsComponent = createControlsComponent(connectToApi);

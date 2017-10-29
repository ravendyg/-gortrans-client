import * as React from 'react';
import { ConnectedNotPure } from '../../../components/connected';
import { IReduxState } from '../../../types/state';
import { IBusSearchModuleStore } from '../types';

export const inputClassName = 'search__input--text';

interface ISearchInputState {
  query: string;
  placeholder: string;
}

interface ISearchInputProps {
  store: IBusSearchModuleStore;
  emit: (newQuery: string) => void;
}

export class SearchInput extends ConnectedNotPure<ISearchInputProps, ISearchInputState, IReduxState> {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  mapState(newState: IReduxState): ISearchInputState {
    return {
      query: newState.busList.query,
      placeholder: newState.translation.text.searchInputPlaceholder
    };
  }

  handleChange(ev: React.ChangeEvent<HTMLInputElement>): void {
    const
      newQuery: string = ev.target.value
      ;
    this.props.emit(newQuery);
  }

  render() {
    return(
      <div className="search__input" data-test-id="bus-search-input">
        <input
          type="text"
          className={inputClassName}
          value={this.state.query}
          onChange={this.handleChange}
          placeholder={this.state.placeholder}
        />
      </div>
    );
  }
}

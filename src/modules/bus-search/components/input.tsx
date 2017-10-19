import * as React from 'react';
import { ConnectedNotPure } from '../../../components/connected';
import { IStore, IReduxState } from '../../../types/state';

export const inputClassName = 'search__input--text';

interface ISearchInputState {
  query: string;
  placeholder: string;
}

interface ISearchInputProps {
  emit: (newQuery: string) => void;
  store: IStore<IReduxState>;
}

export class SearchInput extends ConnectedNotPure<ISearchInputProps, ISearchInputState> {

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
      <div className="search__input">
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

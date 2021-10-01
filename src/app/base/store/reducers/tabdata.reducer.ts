import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TabDataActions from '../actions/tabdata.actions';
export const tabDataFeatureKey = 'tabdata';
import { TabData } from '../../model/tabdata';

export interface TabDataState extends EntityState<TabData> {
  isLoading: boolean;
  error: string | null
}

export const adapter: EntityAdapter<TabData> = createEntityAdapter<TabData>();

export const initialTabDataState: TabDataState = adapter.getInitialState({
  isLoading: true,
  error: null
});;

export const tabDataReducer = createReducer(
  initialTabDataState,
  on(TabDataActions.addTabData,
    (state, action) => adapter.addOne(action.tabdata, state)),
  on(TabDataActions.updateTabData,
    (state, action) => adapter.updateOne(action.tabdata, state)),
  on(TabDataActions.deleteTabData,
    (state, action) => adapter.removeOne(action.tabindex, state)),
  on(TabDataActions.loadTabData,
    (state, action) => adapter.setAll(action.tabdatalist, {
      ...state,
      isLoading: false
    })),
  on(TabDataActions.loadTabDataRequest,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
    }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectIsLoading = (state: TabDataState) => state.isLoading;
export const selectError = (state: TabDataState) => state.error;

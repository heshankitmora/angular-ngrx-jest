import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChart from './reducers/chartdata.reducer';
import * as fromTab from './reducers/tabdata.reducer';

export interface BaseModuleState {
  charts: fromChart.ChartDataState,
  tabdata: fromTab.TabDataState
}

export const baseReducers = {
  charts: fromChart.chartDataReducer,
  tabdata: fromTab.tabDataReducer
}

export const selectBaseModuleState = createFeatureSelector<BaseModuleState>('baseModuleStore');
export const selectChartsState = createSelector(
  selectBaseModuleState, (state: BaseModuleState) => state.charts
);

export const selectTabsState = createSelector(
  selectBaseModuleState, (state: BaseModuleState) => state.tabdata
);

export const baseChartsDataList = createSelector(selectChartsState, fromChart.selectChartData);
export const baseChartDataLoading = createSelector(selectChartsState, fromChart.selectIsLoading);
export const baseChartDataError = createSelector(selectChartsState, fromChart.selectError);

export const baseTabData = createSelector(selectTabsState, fromTab.selectAll);
export const baseTabDataLoading = createSelector(selectTabsState, fromTab.selectIsLoading);
export const baseTabDataError = createSelector(selectTabsState, fromTab.selectError);


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as ChartActions from '../actions/chartdata.actions';
export const chartsFeatureKey = 'charts';
import { Charts } from '../../model/chart';

export const chartAdapter: EntityAdapter<Charts[]> = createEntityAdapter<Charts[]>();

export interface ChartDataState {
  isLoading: boolean;
  error: string | null;
  chartList: Charts[];
}

export const initialState: ChartDataState = {
  isLoading: true,
  error: null,
  chartList: []
};

export const chartDataReducer = createReducer(
  initialState,
  on(ChartActions.loadChartData, (state, action) => ({...state, chartList: action.chartdatalist, isLoading: false})),
  on(ChartActions.loadChartDataRequest, (state, action) => ({...state, chartList: [], isLoading: true}))
);

export const selectIsLoading = (state: ChartDataState) => state.isLoading;
export const selectError = (state: ChartDataState) => state.error;
export const selectChartData = (state: ChartDataState) => state.chartList;

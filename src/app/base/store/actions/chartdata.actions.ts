import { createAction, props } from "@ngrx/store";
import { Charts } from "../../model/chart";

export const loadChartDataRequest = createAction('[Chart Data] Request Load Chart Data');
export const loadChartData = createAction('[Chart Data] Load Chart Data', props<{chartdatalist: Charts[]}>());

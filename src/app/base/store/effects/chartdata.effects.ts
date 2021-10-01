import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';

import { ChartDataService } from '../../service/charts.service';
import { loadChartData, loadChartDataRequest } from '../actions/chartdata.actions';

@Injectable()
export class ChartDataEffect {
  constructor(private actions$: Actions, private chartService: ChartDataService) {}

  loadChartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChartDataRequest),
      switchMap(action =>
        this.chartService.getAllChartData().pipe(
          /** add delay to show api delay */
          delay(500),
          map(data => {
            return loadChartData({chartdatalist: data});
          })
      ))
    )
  );
}

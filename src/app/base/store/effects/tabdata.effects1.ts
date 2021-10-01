import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, debounceTime, delay } from 'rxjs/operators';

import { ChartDataService } from '../../service/charts.service';

@Injectable()
export class TabDataEffects {
  constructor(private actions$: Actions, private chartService: ChartDataService) {}
}

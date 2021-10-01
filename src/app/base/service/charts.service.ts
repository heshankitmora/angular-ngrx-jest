import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charts } from '../model/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getAllChartData(): Observable<Charts[]> {
    return this.http.get<Charts[]>('assets/chartdata/chartdata.json');
  }
}

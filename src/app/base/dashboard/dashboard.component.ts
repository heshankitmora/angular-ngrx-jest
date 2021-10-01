import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { Charts } from '../model/chart';
import { TabData } from '../model/tabdata';
import { MatDialog } from '@angular/material/dialog';
import * as chartStore from '../store/reducers/chartdata.reducer';
import * as baseSelector from '../store/index';
import * as chartAction from '../store/actions/chartdata.actions';
import * as tabAction from '../store/actions/tabdata.actions';
import * as tabStore from '../store/reducers/tabdata.reducer';
import { Update } from '@ngrx/entity';
import { map, takeUntil } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { AddChartsDialogComponent } from '../add-charts-dialog/add-charts-dialog.component';
import { chartDataType } from '../enum/chart-datatype.enum';
import { environment } from 'src/environments/environment';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  baseSubscription: Subject<any> = new Subject();

  /*
   * tabs: first tab
   * selected: selected tab (which is 0 initially)
  */
  tabs = ['TAB1'];
  selected = new FormControl(0);

  /* assign sorted chart data list on descending order */
  sortedChartDataList: Charts[] = [];

  chart: any;
  isChartVisible = false;
  isButtonExpand = false;
  chartDataType: chartDataType = chartDataType.api;

  /*
   * minValue: initial slider minimum value which will be 0
   * highValue: initial slider maximum value which will be 8
  */
  minValue: number = environment.sliderDefaultMinVal;
  highValue: number = environment.sliderDefaultHighVal;
  options: Options = {
    floor: this.minValue,
    ceil: this.highValue
  };

  /*
   *  isLoading$: Observable for check chart data is loaded or still loading
   *  chartDataList$: Observable for list chart data
  */
  isLoading$: Observable<boolean>;
  chartDataList$: Observable<Charts[]>;

  /*
   *  tabDataList$: Observable for tab data
   *  tabDataList: SUbscribed tab data
  */
  tabDataList$: Observable<TabData[]>;
  tabDataList: TabData[] = [];
  selectedIndexTabData$: Observable<TabData[]>;
  selectedIndexTabData: TabData | undefined;

  /*
   * getChartDataType: get enum values for chart generation type
   * values [client: for data added by client, api: for data coming from api(initial data)]
  */
  get getChartDataType(): typeof chartDataType {return chartDataType;}

  constructor(
    private chartStore: Store<chartStore.ChartDataState>,
    private tabStore: Store<tabStore.TabDataState>,
    public dialog: MatDialog
  ) {

    this.chartStore.dispatch(chartAction.loadChartDataRequest());
    this.chartDataList$ = this.chartStore.select(baseSelector.baseChartsDataList);
    this.isLoading$ = this.chartStore.select(baseSelector.baseChartDataLoading);
    this.tabDataList$ = this.tabStore.select(baseSelector.baseTabData);
    this.selectedIndexTabData$ = this.tabDataList$;
  }

  ngOnInit(): void {
    this.chartDataList$
      .pipe(takeUntil(this.baseSubscription))
      .subscribe((chartData: Charts[]) => {
        let chartListSorting = [...chartData];
        this.sortedChartDataList = chartListSorting.sort((a, b) => (b.frequency - a.frequency));
      });

    this.tabDataList$
      .pipe(takeUntil(this.baseSubscription))
      .subscribe((tabData: TabData[]) => {
        this.tabDataList = tabData;
      });
  }

  /*
   * addChartToTab: add new chart to tab with range slider
  */
  addChartToTab(dataType = chartDataType.api) {
    switch(dataType) {
      case chartDataType.client:
        this.chartDataType = chartDataType.client;
        let dialogRef = this.dialog.open(AddChartsDialogComponent, {
          data: { selectedIndex: this.selected?.value }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.loadTabData();
          this.chartDataType = result?.dataAdd ? chartDataType.client: chartDataType.api;
        });
        break;
      default:
        this.loadTabData();
        break;
    }
  }

  /*
   * loadTabData: Load chart data and tab data
  */
  loadTabData() {
    this.options = {
      floor: 0,
      ceil: this.sortedChartDataList.length
    };
    let tabData: TabData = { id: this.selected?.value, sliderLimits: {startIndex: 0, endIndex: this.sortedChartDataList.length} };
    this.tabStore.dispatch(tabAction.addTabData({tabdata: tabData}));
    this.mapVisualize(this.selected?.value);
  }

  /*
   * addChartSelection: expand selection buttons after click add button for user to select proper option
   * get api data or get from user input frequency data
  */
  addChartSelection() {
    this.isButtonExpand = (this.isButtonExpand) ? false : true;
  }

  /*
   * addTab: Add new tab
  */
  addTab() {
    this.tabs.push(`TAB${this.tabs.length + 1}`);
    this.selected.setValue(this.tabs.length - 1);
  }

  /*
   * removeTab: Remove tab
  */
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index - 1);
    this.tabStore.dispatch(tabAction.deleteTabData({tabindex: index}));
  }

  /*
   * selectIndexSection: select a tab
  */
  selectIndexSection(selected: any, $event: any, addBtn = false) {
    selected.setValue($event);
    this.mapVisualize($event);
  }

  /*
   * mapVisualize: visualize map according to the tab index
  */
  mapVisualize(selectedIndex: number) {
    this.selectedIndexTabData$ = this.tabDataList$.pipe(map(tabDataList => tabDataList.filter((tabData: any) => tabData.id === selectedIndex)));

    this.selectedIndexTabData$
      .pipe(takeUntil(this.baseSubscription))
      .subscribe((initialData: TabData[]) => {
        this.selectedIndexTabData = initialData[0];
        if (this.selectedIndexTabData) {
          this.minValue = this.selectedIndexTabData?.sliderLimits?.startIndex;
          this.highValue = this.selectedIndexTabData?.sliderLimits?.endIndex;

          this.isChartVisible = true;
          let labelData = this.sortedChartDataList.map((labelData: any) => labelData.id);
          let frequencyData = this.sortedChartDataList.map((labelData: any) => labelData.frequency);
          let colorMap = this.sortedChartDataList.map((colorData, i) => {
            if (i < this.minValue || i >= this.highValue) {
              return 'grey';
            }
            return '#398380';
          });

          this.chart = new Chart("canvas-data", {
            type: "bar",
            data: {
              labels: labelData,
              datasets: [
                {
                  label: "Frequencies",
                  data: frequencyData,
                  backgroundColor: colorMap
                }
              ]
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          });
        } else {
          this.isChartVisible = false;
        }
      });
  }

  /*
   * rangeChange: Change range slider values depends on index
  */
  rangeChange($event: any) {
    let minVal = $event?.value;
    let maxVal = $event?.highValue;
    let selectedIndex = this.selected?.value;
    let tabData: Update<TabData> = { id: selectedIndex, changes: {sliderLimits: {startIndex: minVal, endIndex: maxVal}} };
    this.tabStore.dispatch(tabAction.updateTabData({tabdata: tabData}));
  }

  ngOnDestroy():void {
    this.baseSubscription.next();
    this.baseSubscription.complete();
  }

}

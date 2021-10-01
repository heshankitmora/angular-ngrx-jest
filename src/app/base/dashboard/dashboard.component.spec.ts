import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import * as tabStore from '../store/reducers/tabdata.reducer';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tabStore: MockStore<tabStore.TabDataState>;
  const checkAddChartsButton = () => fixture.debugElement.queryAll(By.css('.sticky-button-wrapper'));

  beforeEach(async () => {
    const stateChart = {chartList: [{id: 1, frequency: 1200}], isLoading: false, error: null};
    await TestBed.configureTestingModule({
      imports: [AppModule, SharedModule, NgxSliderModule, BrowserAnimationsModule],
      declarations: [ DashboardComponent ],
      providers: [
        provideMockStore({ initialState: stateChart })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for no charts available message', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.isChartVisible).toEqual(false);
    expect(compiled.querySelector('p.para-no-charts-text').textContent).toContain('No charts available, please click on the "+" button to add a new chart');
  });

  it('should add new tab after click add tab button', fakeAsync(() => {
    spyOn(component, 'addTab');
    let currentTabCount = component.selected.value + 1;
    let tabLength = component.tabs.length;
    let button = fixture.debugElement.nativeElement.querySelector('button.add-tab-button');
    button.click();
    tick();
    expect(component.addTab).toHaveBeenCalled();
    expect(currentTabCount).toEqual(tabLength);
  }));

  it('should remove tab after click on close button', fakeAsync(() => {
    spyOn(component, 'removeTab');
    let currentTabLength = component.tabs.length;
    let button = fixture.debugElement.nativeElement.querySelector('button.close-tab-button');
    button.click();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let changedTabLength = component.tabs.length;
      expect(currentTabLength).toEqual((changedTabLength + 1));
    });
  }));

  it('should view default value chart when click on add button and then Add Static Dataset', fakeAsync(() => {
    spyOn(component, 'addChartSelection');
    let addChartSelectionBtn = fixture.debugElement.nativeElement.querySelector('button.sticky-button-wrapper-button');
    addChartSelectionBtn.click();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isButtonExpand).toEqual(true);
      spyOn(component, 'addChartToTab');
      let addChartToTabBtn = fixture.debugElement.nativeElement.querySelector('button.btn-get-static-data');
      addChartToTabBtn.click();
      tick();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.isChartVisible).toEqual(true);
        expect(component.chart).toBeNull;
      });
    });
  }));

  it('should change range slider values properly', fakeAsync(() => {
    let minSliderVal = 1;
    let maxSliderVal = 3;
    spyOn(component, 'addChartSelection');
    let addChartSelectionBtn = fixture.debugElement.nativeElement.querySelector('button.sticky-button-wrapper-button');
    addChartSelectionBtn.click();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isButtonExpand).toEqual(true);
      spyOn(component, 'addChartToTab');
      let addChartToTabBtn = fixture.debugElement.nativeElement.querySelector('button.btn-get-static-data');
      addChartToTabBtn.click();
      tick();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        spyOn(component, 'rangeChange');

        component.rangeChange({value: minSliderVal, highValue: maxSliderVal});
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.highValue).toEqual(maxSliderVal);
          expect(component.minValue).toEqual(minSliderVal);
        });
      });
    });
  }));

});

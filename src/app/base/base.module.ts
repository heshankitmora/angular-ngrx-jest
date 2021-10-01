import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseRouting } from './base.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChartDataEffect } from './store/effects/chartdata.effects';
import { TabDataEffects } from './store/effects/tabdata.effects1';
import { baseReducers } from './store/index';
import { AddChartsDialogComponent } from './add-charts-dialog/add-charts-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AddChartsDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseRouting,
    StoreModule.forFeature('baseModuleStore', baseReducers),
    EffectsModule.forFeature([ChartDataEffect]),
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class BaseModule { }

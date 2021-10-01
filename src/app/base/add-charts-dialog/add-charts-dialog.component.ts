import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as chartStore from '../store/reducers/chartdata.reducer';
import * as chartAction from '../store/actions/chartdata.actions';

@Component({
  selector: 'app-add-charts-dialog',
  templateUrl: './add-charts-dialog.component.html',
  styleUrls: ['./add-charts-dialog.component.scss']
})
export class AddChartsDialogComponent implements OnInit {

  frequencyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private chartStore: Store<chartStore.ChartDataState>
  ) {
    this.frequencyForm = this.formBuilder.group({
      tabindex: this.data.selectedIndex,
      frequencylist: this.formBuilder.array([this.createFrequency()])
    });
  }

  ngOnInit(): void { }

  createFrequency() {
    return this.formBuilder.group({
      frequency: ['']
    });
  }

  addFrequency() {
    let frequencylist = this.frequencyForm.get('frequencylist') as FormArray;
    frequencylist.push(this.createFrequency());
  }

  getFrequencyControls() {
    return (this.frequencyForm.get('frequencylist') as FormArray).controls;
  }

  onFrequencySubmit(): void {
    if (this.frequencyForm.invalid)
      return;

    let formData = this.frequencyForm?.value;

    let frequencyData = formData.frequencylist.map((frequencyData: any, i: number) => {
      return { id: i, frequency: frequencyData?.frequency };
    });

    this.chartStore.dispatch(chartAction.loadChartData({ chartdatalist: frequencyData }));
    this.dialogRef.close({ dataAdd: true });
  }

}

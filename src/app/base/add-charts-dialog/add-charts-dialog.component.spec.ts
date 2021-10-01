import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddChartsDialogComponent } from './add-charts-dialog.component';

describe('AddChartsDialogComponent', () => {
  let component: AddChartsDialogComponent;
  let fixture: ComponentFixture<AddChartsDialogComponent>;

  const mockData = {
    close: jest.mock
  };

  const mockDataAll = jest.mock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [AddChartsDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockData
        }, {
          provide: MAT_DIALOG_DATA,
          useValue: mockData
        }, {
          provide: Store,
          useValue: mockDataAll
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

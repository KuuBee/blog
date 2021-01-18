import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bug-report-dialog',
  templateUrl: './bug-report-dialog.component.html',
  styleUrls: ['./bug-report-dialog.component.scss'],
})
export class BugReportDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<BugReportDialogComponent>
  ) {}

  bugForm = this._formBuilder.group({
    title: [''],
    content: [''],
  });

  ngOnInit(): void {}
  submit() {
    this._matDialogRef.close();
  }
}

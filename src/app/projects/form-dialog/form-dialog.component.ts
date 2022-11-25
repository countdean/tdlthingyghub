import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              public formBuilder: FormBuilder,
              public taskDialog: MatDialog,
              ) { }

  

              date = new FormControl(new Date());

  ngOnInit(): void {
  }

}

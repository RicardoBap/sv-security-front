import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exclusion',
  templateUrl: './dialog-exclusion.component.html',
  styleUrls: ['./dialog-exclusion.component.css']
})
export class DialogExclusionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogExclusionComponent>
  ) { }

  ngOnInit(): void {
  }

}

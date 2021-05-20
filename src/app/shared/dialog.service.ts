import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogExclusionComponent } from './dialog-exclusion/dialog-exclusion.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
    return this.dialog.open(DialogExclusionComponent, {
      width: '500px',
      //panelClass: ['dialog-box'],
      disableClose: true,
      data: {
        message: msg
      }
    }) 
  }
}

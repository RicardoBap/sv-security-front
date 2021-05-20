import { NgModule} from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [],
  exports: [
    MatGridListModule,
    MatInputModule,
    MatCardModule,    
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatDialogModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule {}
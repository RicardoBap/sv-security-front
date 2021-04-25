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

    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: []
})
export class MaterialModule {}
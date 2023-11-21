
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
 exports: [
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule
 ]
})
export class AppMaterialModule { }

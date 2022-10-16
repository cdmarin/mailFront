import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexhomeComponent } from './indexhome/indexhome.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexhomeComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule
  ]
})
export class HomeModule { }

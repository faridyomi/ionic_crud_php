import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import {RouterModule} from "@angular/router";
import {HomePage} from "../home/home.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{
      path:"",
      component: StudentPage
    }])
  ],
  declarations: [StudentPage]
})
export class StudentPageModule {}
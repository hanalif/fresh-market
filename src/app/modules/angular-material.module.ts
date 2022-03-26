import { NgModule } from "@angular/core";

import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  exports:[
    MatIconModule,
    MatSidenavModule
  ]
})
export class AngularMaterialModule{

}

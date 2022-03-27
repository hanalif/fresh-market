import { Component, Input } from '@angular/core';
import { Animations } from './animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.mobileMenuAnimation]
})
export class AppComponent {
 public showWithBackdrop!: boolean;
 public showMobileMenu!: boolean;

 isMobileMenuShow(val:boolean){
   this.showMobileMenu = val;
   this.showWithBackdrop = val;

 }

  onBackdropClicked(val:boolean){
    this.showWithBackdrop = !this.showWithBackdrop;
  }
}



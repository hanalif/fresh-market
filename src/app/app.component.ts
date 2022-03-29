import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animations } from './animations'
import { UIService } from './services/UI.service';
import { UIQuery } from './state/UI/UIQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.mobileMenuAnimation]
})
export class AppComponent implements OnInit {
 public showWithBackdrop!: boolean;
 public showMobileMenu!: boolean;
 isMobileMenuOpen$!: Observable<boolean>

 constructor( private uIQuery: UIQuery, private uIService:UIService) { }
  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen()
  }


  onBackdropClicked(val:boolean){
    this.uIService.setIsMobileMenuOpen(val);
  }

}



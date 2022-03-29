import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';
import { Animations } from '../../../app/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[ Animations.searchBoxAnimation]
})

export class HeaderComponent implements OnInit {
   isSearchBoxOpen: boolean = false;
   isHamburgerOpen!: boolean | undefined;

   @ViewChild('searchBoxContainerEl', { static: false }) searchBoxContainerEl!: ElementRef;
   isMobileMenuOpen$!: Observable<boolean>

  constructor(private uIQuery: UIQuery, private uIService:UIService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isSearchBoxOpen) {
      if(!this.searchBoxContainerEl.nativeElement.contains(event.target)) {
        this.isSearchBoxOpen = false;
      }
    }
  }

  ngOnInit(): void {
    this.isMobileMenuOpen$ = this.uIQuery.setIsMenuMobileOpen();

  }

  get stateName(){
    return this.isSearchBoxOpen ? 'show' : 'hide';

  }

  onToggleSearch(){
    this.isSearchBoxOpen = !this.isSearchBoxOpen;
  }

  onToggleHamburger(val:boolean){
    this.uIService.setIsMobileMenuOpen(val);
  }

}



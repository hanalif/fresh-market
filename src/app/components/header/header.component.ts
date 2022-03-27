import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
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
   @Output() isMobileMenuShow = new EventEmitter<boolean>();


  constructor() { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isSearchBoxOpen) {
      if(!this.searchBoxContainerEl.nativeElement.contains(event.target)) {
        this.isSearchBoxOpen = false;
      }
    }
  }

  ngOnInit(): void {
  }

  get stateName(){
    return this.isSearchBoxOpen ? 'show' : 'hide';

  }

  onToggleSearch(){
    this.isSearchBoxOpen = !this.isSearchBoxOpen;
  }

  onToggleHamburger(){
    this.isHamburgerOpen = !this.isHamburgerOpen;
    this.isMobileMenuShow.emit(this.isHamburgerOpen);
    this.isHamburgerOpen = undefined;
  }

}



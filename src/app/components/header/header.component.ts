import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/UI.service';
import { Animations } from '../../../app/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[ Animations.slidesDownAnumation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
   isSearchBoxOpen: boolean = false;
   isHamburgerOpen!: boolean | undefined;

   @ViewChild('searchBoxContainerEl', { static: false }) searchBoxContainerEl!: ElementRef;


  constructor(private uIService:UIService, private router: Router) { }

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

  onToggleHamburger(val:boolean){
    this.uIService.setIsMobileMenuOpen(val);
  }

  onToggleCart(val: boolean){
    this.uIService.setIsCartOpen(val);
    this.router.navigate(['cart']);
  }
}



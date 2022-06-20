import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/modules/items/services/item.service';
import { UIService } from 'src/app/services/UI.service';
import { Animations } from '../../../app/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[ Animations.slidesDownAnumation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {
   isSearchBoxOpen: boolean = false;
   searchResultItemsSub?: Subscription;

  constructor(
      private uIService:UIService,
      private itemService: ItemService,
      public dialog: MatDialog ) { }

  @ViewChild('searchBoxContainerEl', { static: false }) searchBoxContainerEl!: ElementRef;


  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isSearchBoxOpen) {
      if(!this.searchBoxContainerEl.nativeElement.contains(event.target)) {
        this.isSearchBoxOpen = false;
        this.searchResultItemsSub = this.itemService.getSearchResultItems('').subscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.searchResultItemsSub?.unsubscribe();
  }


  get stateName(){
    return this.isSearchBoxOpen ? 'show' : 'hide';
  }


  onToggleSearch(){
    this.isSearchBoxOpen = !this.isSearchBoxOpen
    this.uIService.setIsSearchBoxOpen(this.isSearchBoxOpen)
  }

  onToggleHamburger(val:boolean){
    this.uIService.setIsMobileMenuOpen(val);
  }

  onToggleCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }


}



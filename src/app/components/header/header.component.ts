import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('searchBoxAnimation',[
      transition('* => show', [
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ]),
      transition('* => void',[
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        })
      ])
    ])
  ]
})

export class HeaderComponent implements OnInit {
   isSearchBoxOpen: boolean = false
   @ViewChild('searchBoxContainerEl', { static: false }) searchBoxContainerEl!: ElementRef;


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
    this.isSearchBoxOpen = !this.isSearchBoxOpen
  }


}



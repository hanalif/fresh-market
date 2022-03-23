import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   isSearchBoxOpen: boolean = false


  constructor() { }

  ngOnInit(): void {
  }

  onToggleSearch(){
    this.isSearchBoxOpen = !this.isSearchBoxOpen
  }

  onCloseSearch(val: boolean){
    this.isSearchBoxOpen = val
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // create a search results route that will get the search key as url parameter
}

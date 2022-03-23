import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() closeSearchBox = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseSearch(val: boolean){
    this.closeSearchBox.emit(val);
  }

}

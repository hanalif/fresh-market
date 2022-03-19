import { Component, OnInit } from '@angular/core';
import { faBasketShopping, faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBasketShopping = faBasketShopping;
  faSearch = faSearch;


  constructor() { }

  ngOnInit(): void {
  }

}

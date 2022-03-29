import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header-nav',
  templateUrl: './main-header-nav.component.html',
  styleUrls: ['./main-header-nav.component.scss']
})
export class MainHeaderNavComponent implements OnInit {
  @Input() isMobileMenuOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

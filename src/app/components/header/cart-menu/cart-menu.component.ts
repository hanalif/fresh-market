import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss']
})
export class CartMenuComponent implements OnInit {
  cartMenuLinksImges: string[] = ['carrot-png-blue-flipped.png','fruit-yellow-png.png', 'leaves-green-png-flipped.png']

  constructor() { }

  ngOnInit(): void {
  }



}

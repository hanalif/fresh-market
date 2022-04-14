import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/UI.service';
import { UIQuery } from 'src/app/state/UI/UIQuery';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private uIService:UIService) { }

  ngOnInit(): void {

  }

  onCloseCart(val: boolean){
    this.uIService.setIsCartOpen(val);
  }

}

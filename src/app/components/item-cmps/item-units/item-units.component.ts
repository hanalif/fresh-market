import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-item-units',
  templateUrl: './item-units.component.html',
  styleUrls: ['./item-units.component.scss']
})
export class ItemUnitsComponent implements OnInit {
  public quantityInput: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onPlus(){

    this.quantityInput++;
  }

  onMinus(){
    if(this.quantityInput <= 0){
      return
    }
    this.quantityInput--;
  }

}

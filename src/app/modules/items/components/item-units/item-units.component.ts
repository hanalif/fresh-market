import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item/item.model';
import { SelectOptions } from 'src/app/shared/components/select-btns/models/select-options.model';
import { ItemUnitNamePipe } from '../../pipes/itemUnitName/item-unit-name.pipe';


@Component({
  selector: 'app-item-units',
  templateUrl: './item-units.component.html',
  styleUrls: ['./item-units.component.scss']
})
export class ItemUnitsComponent implements OnInit, OnChanges {
  public quantityInput: number = 0;
  @Input() item!: Item
  options!: SelectOptions[]
  itemAmountForm!: FormGroup;


  constructor(private unitPipe: ItemUnitNamePipe) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['item'].currentValue !== changes['item'].previousValue){
     this.options = this.item.units.map(unit=>{
        let option: SelectOptions = {
         name: this.unitPipe.transform(unit.unitType),
         value: unit.unitType,
         subName: unit.price
       }
       return option;
     })

   }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.itemAmountForm = new FormGroup({
      'unitType': new FormControl(''),
      'amount': new FormControl(0)
    })
  }

}

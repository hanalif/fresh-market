import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectOptions } from 'src/app/shared/components/select-btns/models/select-options.model';
import { Item } from '../../models/item.model';
import { ItemUnitsValue } from '../../models/itemUnitsValue.model';
import { ItemUnitNamePipe } from '../../pipes/itemUnitName/item-unit-name.pipe';


@Component({
  selector: 'app-item-units',
  templateUrl: './item-units.component.html',
  styleUrls: ['./item-units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemUnitsComponent implements OnInit, OnChanges, OnDestroy {
  public quantityInput: number = 0;
  @Input() item!: Item;
  @Output() itemUnitsValueChanged = new EventEmitter<ItemUnitsValue>()
  options!: SelectOptions[];
  itemAmountForm!: FormGroup;
  itemUnitsValueSubscription: Subscription | undefined;


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
    this.itemUnitsValueSubscription = this.itemAmountForm.get('amount')?.valueChanges.subscribe(amount=>{

      let itemUnitsValue: ItemUnitsValue = {
        ...this.itemAmountForm.value,
        amount: amount,
      }
      this.itemUnitsValueChanged.emit(itemUnitsValue);
    })
  }

  private initForm(){
    this.itemAmountForm = new FormGroup({
      'unitType': new FormControl(this.item.units[0].unitType),
      'amount': new FormControl(0)
    })
  }

  ngOnDestroy(): void {
   this.itemUnitsValueSubscription!.unsubscribe()
  }

}

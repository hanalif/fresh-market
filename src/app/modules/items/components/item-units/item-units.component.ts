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
  @Input() itemUnitsValue!: ItemUnitsValue;

  @Output() itemUnitsValueChanged = new EventEmitter<ItemUnitsValue>()
  options!: SelectOptions[];
  itemAmountForm!: FormGroup;
  itemUnitsValueSubscription: Subscription | undefined;
  unitTypeControl!: FormControl;
  amountControl!: FormControl;


  constructor(private unitPipe: ItemUnitNamePipe) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['items']){
      return;
    }

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

    if(changes['itemUnitsValue'].currentValue !== changes['itemUnitsValue'].previousValue && this.itemAmountForm != null){
      if(this.itemUnitsValue != null) {
        this.amountControl.setValue(this.itemUnitsValue.amount, { emitEvent: false });
        this.unitTypeControl.setValue(this.itemUnitsValue.unitType, { emitEvent: false });
      }
      else {
        this.amountControl.setValue(0, { emitEvent: false });
        this.unitTypeControl.setValue(this.item.units[0].unitType, { emitEvent: false });
      }
    }

  }

  ngOnInit(): void {
    this.initForm();
    this.unitTypeControl = this.itemAmountForm.get('unitType') as FormControl;
    this.amountControl = this.itemAmountForm.get('amount') as FormControl;
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
      'unitType': new FormControl(this.itemUnitsValue != null ? this.itemUnitsValue.unitType : this.item.units[0].unitType),
      'amount': new FormControl(this.itemUnitsValue != null ? this.itemUnitsValue.amount : 0)
    })
  }

  ngOnDestroy(): void {
   this.itemUnitsValueSubscription!.unsubscribe()
  }

}

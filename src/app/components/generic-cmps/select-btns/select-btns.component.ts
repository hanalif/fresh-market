
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { SelectOptions } from './models/select-options.model';

@Component({
  selector: 'app-select-btns',
  templateUrl: './select-btns.component.html',
  styleUrls: ['./select-btns.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectBtnsComponent,
    multi: true
  }]
})
export class SelectBtnsComponent implements OnInit, ControlValueAccessor, OnDestroy {
  onChange: any;
  onTouched: any;
  selectionForm!: FormGroup;
  valSubscription!: Subscription | undefined;

  constructor() { }

  @Input() selectOptions!: SelectOptions[];
  value!: string;


  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
    this.initForm();
    this.valSubscription = this.selectionForm.get('value')?.valueChanges.subscribe(val=>{
        this.onChange(val);
    })
  }

  private initForm(){
    this.selectionForm = new FormGroup({
      'value': new FormControl (''),
    })
  }

  ngOnDestroy(): void {
   this.valSubscription?.unsubscribe();
  }

}

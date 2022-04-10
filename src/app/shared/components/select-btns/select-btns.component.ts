
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectBtnsComponent implements OnInit, ControlValueAccessor {
  onChange: any;
  onTouched: any;
  selectionForm!: FormGroup;

  constructor() { }

  @Input() selectOptions!: SelectOptions[];
  value!: string;

  ngOnInit(): void {
    this.initForm();
  }


  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }


  private initForm(){
    this.selectionForm = new FormGroup({
      'value': new FormControl (''),
    })
  }

  onSelectOption(value: string){
    this.value = value;
    this.onChange(this.value)
  }


}


import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  valueControl!: FormControl;

  constructor() { }

  @Input() selectOptions!: SelectOptions[];

  ngOnInit(): void {
    this.initForm();
    this.valueControl = this.selectionForm.get('value') as FormControl;
  }

  writeValue(value: string): void {
    this.valueControl?.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }


  private initForm(){
    this.selectionForm = new FormGroup({
      'value': new FormControl (),
    })
  }

  onSelectOption(value: string){
    this.valueControl.setValue(value);
    this.onChange(value);
  }


}

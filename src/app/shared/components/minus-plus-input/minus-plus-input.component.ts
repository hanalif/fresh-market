import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minus-plus-input',
  templateUrl: './minus-plus-input.component.html',
  styleUrls: ['./minus-plus-input.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MinusPlusInputComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinusPlusInputComponent implements OnInit, ControlValueAccessor {
  counter: number = 0;
  onChange: any;
  onTouched: any;
  minusPlusForm!: FormGroup;
  counterSubscription!: Subscription | undefined;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();

  }

  writeValue(counter: number): void {
    this.counter = counter;
    this.cd.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
   this.onTouched = fn;
  }



  private initForm(){
    this.minusPlusForm = new FormGroup({
      'counter': new FormControl (0),
    })
  }

  onPlus(){
    this.counter++;
    this.onChange(this.counter)
  }

  onMinus(){
    if(this.counter <= 0){
      return
    }
    this.counter--;
    this.onChange(this.counter)
  }
}

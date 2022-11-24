import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisplayNone]'
})
export class DisplayNoneDirective implements OnInit{
  public innerWidth: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
    if(this.innerWidth <= 680){
      this.elementRef.nativeElement.style.display = 'none';
    }else{
      this.elementRef.nativeElement.style.display = 'block';
    }

  }


}

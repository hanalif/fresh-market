import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
  slidesDownAnumation: trigger('slidesDownAnumation',[
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-10px)'
      }),
      animate('100ms', style({
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ]),
    transition(':leave',[
      style({
        opacity: 1,
        transform: 'translateY(0)'
      }),
      animate('100ms', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      }))
    ])
  ]),

  mobileMenuAnimation: trigger('mobileMenuAnimation',[
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('200ms', style({
        opacity: 1,
        transform: 'translateX(0)'
      }))
    ]),
    transition(':leave',[
      style({
        opacity: 1,
        transform: 'translateX(0)'
      }),
      animate('200ms', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ])


}

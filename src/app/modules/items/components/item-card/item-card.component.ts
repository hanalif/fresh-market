import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;


  constructor() { }

  ngOnInit(): void {
  }


}

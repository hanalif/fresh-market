import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { ItemModalData } from '../item-modal/models/data.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const data: ItemModalData = {
      item: this.item,
    };
    this.dialog.open(ItemModalComponent, {
      data: data,
    });
  }


}

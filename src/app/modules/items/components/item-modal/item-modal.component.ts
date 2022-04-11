import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item) { }

  ngOnInit(): void {
  }

}

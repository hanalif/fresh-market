import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ItemModalData } from './models/data.model';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemModalComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemModalData,  public dialogRef: MatDialogRef<ItemModalComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

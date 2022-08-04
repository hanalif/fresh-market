import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/auth/models/user.model';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
  user!: User
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log('personal-area-component')
    this.user = this.activatedRoute.snapshot.data['user'];

  }



}

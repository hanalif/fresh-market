
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, of, switchMap } from "rxjs";
import { User } from "../../models/user.model";
import { AuthQuery } from "../auth-state/authQuery";
import { UserState, UserStore } from "../user-state/userStore";

@Injectable({providedIn: 'root'})
export class UserQuery extends QueryEntity<UserState, User> {

  constructor(protected userStore: UserStore, private authQuery: AuthQuery) {
    super(userStore);
  }

  getUsers() {
    return this.selectAll();
  }


  }


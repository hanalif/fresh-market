import { Injectable } from "@angular/core";
import { ActiveState, EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { User } from "../../models/user.model";

export interface UserState extends EntityState<User, string>, ActiveState  {}



@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'user', idKey: '_id' })
export class UserStore extends EntityStore<UserState> {

  constructor() {
    super();
  }
}



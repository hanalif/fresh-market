import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/user.model";
import { Item } from "../../items-shared.module.ts/models/item.model";
import { AuthState, AuthStore } from "./authStore";


@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<AuthState>{
  constructor(private authStore: AuthStore){
    super(authStore)
  }


  getLoggedInUser(): Observable<User | undefined>{
    return this.select<User | undefined>(state => state.loggedInUser);
  }

}

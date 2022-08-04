import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable, of, switchMap } from "rxjs";
import { User } from "../../models/user.model";
import { AuthState, AuthStore } from "../auth-state/authStore";


@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<AuthState>{
  constructor(private authStore: AuthStore){
    super(authStore)
  }


  getLoggedInUser(): Observable<User | undefined>{
    return this.select<User | undefined>(state=> state.loggedInUser);
  }

  isLoggedInUser(): Observable<boolean>{
    const value = this.getValue().loggedInUser;
    return of(value? true : false);
  }

}

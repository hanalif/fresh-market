import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { AuthQuery } from "../state/auth-state/authQuery";




@Injectable({providedIn: 'root'})
export class ItemsListResolver implements Resolve<User | undefined>{
  constructor( private authQuery: AuthQuery){}

  resolve(route: ActivatedRouteSnapshot): User | undefined | Observable<User | undefined > | Promise<User | undefined > {
    return this.authQuery.getLoggedInUser()
  }
}

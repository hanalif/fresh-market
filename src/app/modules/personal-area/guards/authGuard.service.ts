import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthQuery } from "../../auth/state/auth-state/authQuery";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authQuery: AuthQuery){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
    return this.authQuery.isLoggedInUser()
  }

}

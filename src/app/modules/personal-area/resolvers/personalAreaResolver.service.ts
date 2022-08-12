import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable} from 'rxjs';
import { User } from '../../auth/models/user.model';
import { AuthStore } from '../../auth/state/auth-state/authStore';

@Injectable({ providedIn: 'root' })
export class PersonalAreaResolver implements Resolve<User> {
  constructor(private authStore: AuthStore) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> | Promise<User> {

    const loggedInUser = this.authStore.getValue().loggedInUser;

    return loggedInUser as User
  }
}

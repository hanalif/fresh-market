import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '../models/user.model';



export interface AuthState {
  loggedInUser?: User
}

export const getInitialState = () => {
  return {
    loggedInUser: undefined
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(getInitialState());
  }
}

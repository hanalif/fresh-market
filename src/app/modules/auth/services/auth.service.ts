import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, map, Observable, switchMap, tap } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { LoggedInUserStorageDetails } from "../models/logged-in-user-storage-details.model";

import { LoginDetails } from "../models/login-details.model";
import { SignupDetails } from "../models/signup-details.model";
import { User } from "../models/user.model";
import { AuthStore } from "../state/authStore";

@Injectable({providedIn: 'root'})
export class AuthService{
  private readonly entityType: string = 'loggedInUser';

  constructor(private http: HttpClient, private authStore:AuthStore, private storageService: StorageService){}

  signup(userCred: SignupDetails){
    const newUser = {

    }

  }

  login(userCred: LoginDetails){
    return this._getUsers().pipe(
      switchMap(users =>{
        let loggedInUser: User | undefined;
        let setLoggedInUserToStorage$: Observable<void>;
        const index = users.findIndex(user=> user.username === userCred.username && user.password === userCred.password);
        if(index === -1){
          loggedInUser = undefined;
          setLoggedInUserToStorage$ = EMPTY;
        }else{
          loggedInUser = users[index];
          const userStorageDetails: LoggedInUserStorageDetails = {_id: loggedInUser.username};
          setLoggedInUserToStorage$ = this.storageService.post(this.entityType, userStorageDetails)
        }
        this.authStore.update(state=>{
          return {
            ...state,
            loggedInUser: loggedInUser
          }
        })
        return setLoggedInUserToStorage$
      })
    )
  }

  logout(){
    return this.storageService.removeLocalStorageSessions(this.entityType).pipe(
      map(massage=>{
        console.log(massage);
        this.authStore.update(state=>{
          return{
            ...state,
            loggedInUser: undefined
          }
        })
      })
    )
  }



  _getUsers(){
    return this.http.get<User[]>('assets/_json-files/users.json');
  }


}

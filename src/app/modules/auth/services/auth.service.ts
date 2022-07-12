import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { LoggedInUserStorageDetails } from "../models/logged-in-user-storage-details.model";

import { LoginDetails } from "../models/login-details.model";
import { SignupDetails } from "../models/signup-details.model";
import { User } from "../models/user.model";
import { AuthStore } from "../state/auth-state/authStore";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class AuthService{
  private readonly entityType: string = 'loggedInUser';


  constructor(private http: HttpClient,
              private authStore:AuthStore,
              private storageService: StorageService,
              private userService:UserService){}

  signup(userCred: SignupDetails){

    const newUser:User = {
      _id: this._makeId(),
      name: userCred.name,
      lastname: userCred.lastname,
      isAdmin: false,
      username: userCred.username,
      password: userCred.password,
      email: userCred.email,
      phone: userCred.phone,
      ordersId: []
    }

    const loginDetails: LoginDetails = {
      username: newUser.username,
      password: newUser.password
    }

    return this.userService.findUser(loginDetails).pipe(
      switchMap(user=>{
        if(!user){
          return this.saveSignUpUser(newUser);
        }else{
          return of('user already exists');
        }
      })
    )

  }

  login(userCred: LoginDetails){
    return this.userService.findUser(userCred).pipe(
      switchMap(user=>{
        if(user){
          return this.saveLoggedInUserId(user?._id);
        }else{
          return of('could not find user');
        }
      })
    )
  }

  saveSignUpUser(newUser: User){
    return this.userService.addUser(newUser).pipe(
      switchMap(()=>{
        return this.saveLoggedInUserId(newUser._id);
      })
    )
  }

  saveLoggedInUserId(userId?: string){
    let setLoggedInUserIdToStorage$: Observable<void>;
    if(userId){
      const userStorageDetails: LoggedInUserStorageDetails = {_id: userId};
      setLoggedInUserIdToStorage$ = this.storageService.post(this.entityType, userStorageDetails )
    }else{
      setLoggedInUserIdToStorage$ = EMPTY;
    }
    this.authStore.update(state=>{
      return {
        ...state,
        loggedInUserId: userId
      }
    })
    return setLoggedInUserIdToStorage$
  }

  logout(){
    return this.storageService.removeLocalStorageSessions(this.entityType).pipe(
      map(massage=>{
        this.authStore.update(state=>{
          return{
            ...state,
            loggedInUserId: undefined
          }
        })
      })
    )
  }

  setInitialLoggedInUser(){
    return this.storageService.get(this.entityType).pipe(
      switchMap(loggedInUserId=>{
        if(loggedInUserId.length == 0){
          return EMPTY;
        }
         return of(this.authStore.update(state=>{
            return{
              ...state,
              loggedInUserId: loggedInUserId[0]._id
            }
        }))
      }),
    )
  }



  _makeId(length = 8) {
    let txt = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


}

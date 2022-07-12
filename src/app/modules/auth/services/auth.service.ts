import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, forkJoin, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { UtilService } from "src/app/services/util.service";
import { LoggedInUserStorageDetails } from "../models/logged-in-user-storage-details.model";

import { LoginDetails } from "../models/login-details.model";
import { SignupDetails } from "../models/signup-details.model";
import { User } from "../models/user.model";
import { AuthStore } from "../state/auth-state/authStore";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class AuthService{
  private readonly entityType: string = 'loggedInUser';


  constructor(private authStore:AuthStore,
              private storageService: StorageService,
              private utilService: UtilService,
              private userService:UserService){}

  signup(userCred: SignupDetails){

    const newUser:User = {
      _id: this.utilService.makeId(),
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
          return forkJoin([this.userService.addUser(newUser), this.saveLoggedInUserId(newUser._id)]).pipe(
            map(res=> {return})
          )
        }else{
          return throwError(() => new Error(`user already exists`));
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
          return throwError(() => new Error(`could not find user`));
        }
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
    this.saveLoggedInUserIdToStore(userId);
    return setLoggedInUserIdToStorage$
  }

  saveLoggedInUserIdToStore(userId?:string){
    this.authStore.update(state=>{
      return{
        ...state,
        loggedInUserId: userId
      }
    })
  }

  logout(){
    return this.storageService.removeLocalStorageSessions(this.entityType).pipe(
      map(massage=>{
        this.saveLoggedInUserIdToStore(undefined);
      })
    )
  }

  setInitialLoggedInUser(){
    return this.storageService.get(this.entityType).pipe(
      switchMap(loggedInUserId=>{
        if(loggedInUserId.length == 0){
          return EMPTY;
        }
         return of (this.saveLoggedInUserIdToStore(loggedInUserId[0]._id));
      }),
    )
  }



}

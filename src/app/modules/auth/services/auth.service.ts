
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { EMPTY, forkJoin, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { CartService } from "src/app/services/cart.service";
import { UtilService } from "src/app/services/util.service";
import { UserPersonalDetails } from "../../personal-area/models/personalDetails.model";
import { LoggedInUserStorageDetails } from "../models/logged-in-user-storage-details.model";

import { LoginDetails } from "../models/login-details.model";
import { ShippingAdress } from "../models/shippingAdress.model";
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
              private cartService: CartService,
              private router: Router,
              private dialogRef: MatDialog,
              private userService:UserService){}

  signup(userCred: SignupDetails){

    const newUser:User = {
      _id: this.utilService.makeId(),
      name: userCred.name,
      lastname: userCred.lastname,
      isAdmin: false,
      password: userCred.password,
      email: userCred.email,
      phone: userCred.phone,
      ordersId: []
    }

    const loginDetails: LoginDetails = {
      email: newUser.email,
      password: newUser.password
    }

    return this.userService.findUser(loginDetails).pipe(
      switchMap(user=>{
        if(!user){
          return forkJoin([this.userService.addUser(newUser), this.saveLoggedInUser(newUser)]).pipe(
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
          return this.saveLoggedInUser(user);
        }else{
          return throwError(() => new Error(`could not find user`));
        }
      })
    )
  }

  saveLoggedInUser(user?: User){
    let setLoggedInUserIdToStorage$: Observable<void>;
    if(user){
      const userStorageDetails: LoggedInUserStorageDetails = {_id: user._id};
      setLoggedInUserIdToStorage$ = this.storageService.post(this.entityType, userStorageDetails )
    }else{
      setLoggedInUserIdToStorage$ = EMPTY;
    }
    this.saveLoggedInUserToStore(user);
    return setLoggedInUserIdToStorage$
  }

  saveLoggedInUserUpdatedPersonalDetails(loggedInUser: User, newPersonalDetails: UserPersonalDetails){
    const updatedUser: User = {
      ...loggedInUser,
      name: newPersonalDetails.name,
      lastname: newPersonalDetails.lastName,
      email: newPersonalDetails.email,
      phone: +newPersonalDetails.phone
    }

    this.saveLoggedInUserToStore(updatedUser);
    return this.userService.updateUser(updatedUser);
  }

  saveShippingAdress(loggedInUser: User, updatedShippingAdress: ShippingAdress){
    const updatedUser = {...loggedInUser,
      shippingAdress: updatedShippingAdress
    }

    this.saveLoggedInUserToStore(updatedUser);
    return this.userService.updateUser(updatedUser);
  }

  saveLoggedInUserToStore(user?: User){
    this.authStore.update(state=>{
      return{
        ...state,
        loggedInUser: user
      }
    })
  }



  logout(){
    const logout$ = this.storageService.removeLocalStorageSessions(this.entityType).pipe(
      map(massage=>{
        this.saveLoggedInUser(undefined);
      })
    )

    const emptyCart$ = this.cartService.emptyCart();
    this.dialogRef.closeAll();
    this.router.navigate(['']);

    return forkJoin([logout$, emptyCart$ ])
  }

  setInitialLoggedInUser(){
    return this.storageService.get(this.entityType).pipe(
      switchMap(loggedInUserId=>{
        if(loggedInUserId.length == 0){
          return EMPTY;
        }
          let loggedInUser$ = this.userService.findUserById(loggedInUserId[0]._id).pipe(
            tap(loggedInUser => this.saveLoggedInUserToStore(loggedInUser))
          );
         return loggedInUser$;
      }),
    )
  }



}

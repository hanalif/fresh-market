import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  map, of, switchMap, tap } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { LoginDetails } from "../models/login-details.model";
import { User } from "../models/user.model";
import { UserStore } from "../state/user-state/userStore";

@Injectable({providedIn: 'root'})
export class UserService {

  private readonly entityType: string = 'Users';

  constructor(private storageService: StorageService, private http: HttpClient, private userStore: UserStore){

  }

  getUsers(){
    return this._getUsersFromLocalStorage().pipe(
      switchMap(usersFromLocalStorage => {
        if(usersFromLocalStorage.length == 0){
          return this._getUsersFromJson().pipe(
            tap(usersFromJson=>{
              this.storageService._save(this.entityType, usersFromJson);
              this.userStore.set([...usersFromJson]);
            })
          )
        }else{
          this.userStore.set([...usersFromLocalStorage]);
          return of(usersFromLocalStorage)
        }
      })
    )
  }


  addUser(newUser: User){
    this.userStore.add(newUser);
    return this.storageService.post(this.entityType, newUser);
  }

  updateUser(updatedUser: User){
    this.userStore.replace(updatedUser._id, updatedUser);
    return this.storageService.put(this.entityType, updatedUser)
  }

  removeUser(userId: string){
    this.userStore.remove(userId);
    return this.storageService.remove(this.entityType, userId);
  }

  findUser(userCred: LoginDetails){
    return this.getUsers().pipe(
      switchMap(users=>{
        const index = users.findIndex(user=> user.email === userCred.email && user.password === userCred.password);
        if(index === -1){
          return of(undefined)
        }else{
          return of(users[index])
        }
      })
    )

  }

  findUserById(userId:string){
    return this.getUsers().pipe(
      switchMap(users=>{
        const index = users.findIndex(user=> user._id === userId);
        if(index === -1){
          return of(undefined)
        }else{
          return of(users[index])
        }
      })
    )
  }


  _getUsersFromJson(){
    return this.http.get<User[]>('assets/json-files/users.json');
  }

  _getUsersFromLocalStorage(){
    return this.storageService.get<User>(this.entityType)
  }


}

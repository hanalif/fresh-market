import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";
import { Entity } from "../shared/models/entity.model";

@Injectable({providedIn: 'root'})
export class StorageService {

  get<T extends Entity>(entityType:string){
    let entities: T[];
    const json = localStorage.getItem(entityType);
    entities = json != null ? JSON.parse(json) : [];
    return of(entities);
  }



  getById<T extends Entity>(entityType: string, entityId: string){
    return this.get<T>(entityType).pipe(
      map(entities=>{
        return entities.find(entity=> entity._id === entityId);
      })
    )
  }

  post<T extends Entity>(entityType: string, newEntity: T){
    return this.get<T>(entityType).pipe(
      tap(entities=>{
          entities.push(newEntity);
          this._save(entityType, entities)
      }),
      map(entities=>{
        return;
      })
    )
  }

  put<T extends Entity>(entityType: string, updatedEntity: T){
    return this.get<T>(entityType).pipe(
      tap(entities=>{
        const index = entities.findIndex(entity => entity._id === updatedEntity._id);
        entities.splice(index, 1, updatedEntity);
        this._save(entityType, entities);
      }),
      map(()=>{
        return;
      })
    )
  }

  remove<T extends Entity>(entityType: string, entityId: string){
    return this.get<T>(entityType).pipe(
      tap(entities=>{
        const index = entities.findIndex(entity => entity._id === entityId);
        entities.splice(index, 1);
        this._save(entityType, entities);
      })
    )
  }

   _save<T>(entityType: string, entities: T[] ){
      localStorage.setItem(entityType, JSON.stringify(entities));
   }

}

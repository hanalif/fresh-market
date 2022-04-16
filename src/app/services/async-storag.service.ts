import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class StorageService{

  query<T>(entityType:string){
    let entities: T[];
    const json = localStorage.getItem(entityType);
    entities = json != null ? JSON.parse(json) : [];
    return of(entities);
  }

  post<T>(entityType: string, newEntity: T){
    return this.query<T>(entityType).pipe(
      tap(entities=>{
          entities.push(newEntity);
          this._save(entityType, entities)
      }),
      map(entities=>{
        return;
      })
    )
  }

   _save<T>(entityType: string, entities: T[] ){
      localStorage.setItem(entityType, JSON.stringify(entities));
   }

}

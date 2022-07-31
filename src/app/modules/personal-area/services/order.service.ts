import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { UtilService } from "src/app/services/util.service";

@Injectable({providedIn: 'root'})

export class OrderService{
  private readonly entityType: string = 'orders';

  constructor(private storageService: StorageService, private utilService: UtilService){}

  saveOrder(){

  }


}


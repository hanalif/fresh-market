import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin,tap, of, switchMap, map } from "rxjs";
import { StorageService } from "src/app/services/async-storag.service";
import { CartService } from "src/app/services/cart.service";
import { UtilService } from "src/app/services/util.service";
import { ItemOrderInfo } from "src/app/shared/models/order/itemOrderInfo.model";
import { Order } from "src/app/shared/models/order/order.model";
import { User } from "../../auth/models/user.model";
import { AuthService } from "../../auth/services/auth.service";
import { UserService } from "../../auth/services/user.service";
import { OrderStore } from "../state/order-state/orderStore";

@Injectable({providedIn: 'root'})

export class OrderService{
  private readonly entityType: string = 'orders';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private orderStore: OrderStore,
    private userService: UserService,
    private cartService: CartService,
    private utilService: UtilService,
    private http: HttpClient){}

  saveNewOrder(itemsOrderInfo: ItemOrderInfo[], totalPrice: number, loggedInUser: User){

    const newOrder: Order = {
      _id: this.utilService.makeStringNumbersId(),
      createdAt: new Date,
      totalPrice: totalPrice,
      items: itemsOrderInfo,
      buyerId: loggedInUser._id,
      status: 2
    }
    const updatedOrdersIds = [...loggedInUser.ordersId, newOrder._id];
    const updatedLoggedInUser = {...loggedInUser, ordersId: updatedOrdersIds};


    this.authService.saveLoggedInUserToStore(updatedLoggedInUser);

    const saveUpdatedLoggedInUserToUsers$ = this.userService.updateUser(updatedLoggedInUser);
    const addOrderToOrdersDB$ = this.addOrder(newOrder);
    const emptyCart$ = this.cartService.emptyCart();
    const message$ = of(console.log('order saved'))

    return forkJoin([saveUpdatedLoggedInUserToUsers$, addOrderToOrdersDB$, emptyCart$, message$ ]);
  }


  addOrder(newOrder: Order){
    this.orderStore.add(newOrder);
    return this.storageService.post(this.entityType, newOrder);
  }

  findUserOrders(ordersIds: string[], loggedInUserId:string){
    return this.getOrders().pipe(map(orders=>{
        let userOrders = orders.filter(order => order.buyerId === loggedInUserId && ordersIds.includes(order._id) );
        return userOrders;
      }
    ))

  }

  getOrders(){
    return this._getOrdersFromLocalStorage().pipe(
      switchMap(ordersFromLocalStorage => {
        if(ordersFromLocalStorage.length == 0){
          return this._getOrdersFromJson().pipe(
            tap(ordersFromJson=>{
              this.storageService._save(this.entityType, ordersFromJson);
              this.orderStore.set([...ordersFromJson]);
            })
          )
        }else{
          this.orderStore.set([...ordersFromLocalStorage]);
          return of(ordersFromLocalStorage)
        }
      })
    )
  }

  _getOrdersFromJson(){
    return this.http.get<Order[]>('assets/_json-files/orders.json');
  }

  _getOrdersFromLocalStorage(){
    return this.storageService.get<Order>(this.entityType)
  }

}


import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UtilService{

  makeId(length = 8) {
    let txt = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

getformatDate(mDate: Date) {
  let mm: number | string;
  let dd: number | string;
  const yyyy = mDate.getFullYear();
    mm = mDate.getMonth() + 1;
    dd = mDate.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = mm + '/' + dd + '/' + yyyy;

  return formattedDate

}

}

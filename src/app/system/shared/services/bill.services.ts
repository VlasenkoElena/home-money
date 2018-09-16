import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../models/bill.models';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService  extends BaseApi{

    constructor(public http: Http) {
      super(http);
    }

    /*getBill(): Observable<Bill> {
       return this.http.get('http:localhost:3000/bill')
       .map((response: Response) => response.json());
    }*/
    getBill(): Observable<Bill> {
      return this.get('bill');
   }

   updateBill(bill: Bill): Observable<Bill> {
       return this.put('bill', bill);
   }
    getCurrency(base: string = 'EUR'): Observable<any> {
      return this.http.get(`http://data.fixer.io/api/latest?access_key=fd22bf41cbf22edb50ea2483f9e0aa11&base=${base}`)
      .map((response: Response) => response.json());
    }
}
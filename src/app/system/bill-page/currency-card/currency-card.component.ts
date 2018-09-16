import { Component, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.models';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

  @Input() currency: any;
  currencies: string[] = ['USD', 'RUB']

}

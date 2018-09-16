import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.services';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/models/bill.models';
import { WFMEvent } from '../shared/models/event.models';
import { Category } from '../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(private billService: BillService,
        private categoriesService: CategoriesService,
        private eventsService: EventsService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
       this.bill = data[0];
       this.categories = data[1];
       this.events = data[2];

       this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e=>e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPersent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent> 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPersent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPersent(cat);
    const className = percent < 60? 'success' : percent>= 100 ? 'danger' : 'warning'; 
    return className;
  }
  ngOnDestroy() {
    if(this.sub1) { this.sub1.unsubscribe();}
  }

}

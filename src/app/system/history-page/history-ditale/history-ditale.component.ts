import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { WFMEvent } from '../../shared/models/event.models';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-ditale',
  templateUrl: './history-ditale.component.html',
  styleUrls: ['./history-ditale.component.scss']
})
export class HistoryDitaleComponent implements OnInit, OnDestroy {
  isLoaded = false;
  event: WFMEvent;
  category: Category;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
     private eventsServece: EventsService,
     private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.s1 = this.route.params
    .mergeMap((params: Params) => this.eventsServece.getEventById(params['id']))
    .mergeMap((event: WFMEvent) => {
      this.event = event;
      return this.categoriesService.getCategoryById(event.category);
    })
    .subscribe((category: Category) => {
      this.category = category;
      this.isLoaded = true;
    })
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}

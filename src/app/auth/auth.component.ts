import { Component, OnInit, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { fadeStateTrigger } from "../shared/animation/fade.animation";

@Component({
    selector: 'wfm-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
    @HostBinding('@fadea') a= true;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/login']);
    }
}
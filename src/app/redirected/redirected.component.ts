import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-redirected',
  templateUrl: './redirected.component.html',
  styleUrls: ['./redirected.component.css']
})
export class RedirectedComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private route: Router, public userService: UserService) {
  }

  // This component's sole function is to redirect the user from this page to /home
  // If this doesn't happen, the authentication methods don't trigger in the ngOnInit after the login and the data doesn't get updated
  ngOnInit(): void {
    const counter = Observable.interval(250);
    this.subscription = counter.subscribe((value) => {
        if (value === 1) {
          this.route.navigateByUrl('/home');
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

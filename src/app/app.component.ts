import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public load: boolean = false;
  public data: any = {};

  constructor( private auth: AuthService){

  }

  ngOnInit(): void {

    this.auth.getToken().subscribe( (result: any) => {
      if(result) {
        this.load = true;
        this.data = result.quotes[0].fields;
      }
    });

  }
}

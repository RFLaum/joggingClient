import { Component, OnInit } from '@angular/core';
import { User } from './users/user.model';

import { ReaderService } from './reader/reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Jogging Management";

  constructor(private reader: ReaderService){}
  
  ngOnInit(){
    // this.user = new User();
    // this.readable = JSON.stringify(this.user);
  }
}

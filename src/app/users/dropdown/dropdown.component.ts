import { Component, OnInit } from '@angular/core';

import { ReaderService } from '../../reader/reader.service';
import { User } from '../user.model';
import { SelectedService } from '../selected.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  users: User[];
  // selectedId: number;

  constructor(private reader: ReaderService, private sel: SelectedService) { }

  ngOnInit() {
    let usersObservable = this.reader.getViewableUsers();
    usersObservable.subscribe((resp) => this.users = resp);
  }

  get selID(): number {
    return this.sel.user.id;
  }
  set selID(newID: number){
    this.sel.user = this.users.find(u => u.id == newID);
  }

}

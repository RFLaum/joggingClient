import { Component, OnInit } from '@angular/core';

import { ReaderService } from '../../reader/reader.service';
import { SelectedService } from '../../users/selected.service';
import { UtilityService } from '../../utility.service';
import { Jog } from '../jog.model';
import { JogComponent } from './jog/jog.component';

@Component({
  selector: 'app-jog-list',
  templateUrl: './jog-list.component.html',
  styleUrls: ['./jog-list.component.css']
})
export class JogListComponent implements OnInit {
  private jogs: Jog[];
  private _page: number;

  constructor(private reader: ReaderService,
              private sel: SelectedService,
              private util: UtilityService) {
    this.sel.jogUpdated.subscribe((resp) => {
      const index = this.jogs.findIndex((x) => x.id == resp.id);
      if (index == -1) return;
      if (resp.jog === null){
        this.jogs.splice(index, 1);
      } else {
        this.jogs[index] = resp.jog;
      }
    });
    this.sel.jogCreated.subscribe((resp) => {
      const date = new Date(resp.date);
      if (this._page > 1 && date > new Date(this.jogs[0].date)) return;
      const index = this.jogs.findIndex((x) => date > new Date(x.date));
      if (index == -1) return;
      this.jogs.splice(index, 0, resp);
    });
  }

  get page(): number { return this._page; }
  set page(page: number) {
    this._page = page;
    this.fillList();
  }

  ngOnInit() {
    this.page = 1;
    this.fillList();
  }

  fillList(){
    const obs = this.sel.getJogs(this.page);
    obs.subscribe(
      (resp) => this.jogs = resp,
      (err) => {/* TODO */}
    );
  }

  private numPages(): number {
    return this.util.numPages(this.sel.numJogs, 20);
  }

}

import { Component, OnInit } from '@angular/core';

import { ReaderService } from '../../reader.service';

@Component({
  selector: 'app-in-header',
  templateUrl: './in-header.component.html',
  styleUrls: ['./in-header.component.css']
})
export class InHeaderComponent implements OnInit {

  constructor(private reader: ReaderService) { }

  ngOnInit() {
  }

}

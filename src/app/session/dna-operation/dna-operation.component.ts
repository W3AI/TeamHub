import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dna-operation',
  templateUrl: './dna-operation.component.html',
  styleUrls: ['./dna-operation.component.css']
})
export class DnaOperationComponent implements OnInit {
  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dna-problem',
  templateUrl: './dna-problem.component.html',
  styleUrls: ['./dna-problem.component.css']
})
export class DnaProblemComponent implements OnInit {
  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}

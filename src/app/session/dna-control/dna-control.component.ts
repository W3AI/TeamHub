import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dna-control',
  templateUrl: './dna-control.component.html',
  styleUrls: ['./dna-control.component.css']
})
export class DnaControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber = 0;

  constructor() { }

  ngOnInit() {
  }

  onStartProject() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onPauseProject() {
    clearInterval(this.interval);
  }
}

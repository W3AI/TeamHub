import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  timer: number;
  aiName: string = 'NC1 - Network Cortex 1';
  // @Output() newDnaCycle = new EventEmitter<number>();
  interval = 500;   // nr or miliseconds for the DNA Loop  interval
  newInterval = 500;

  constructor() { 
    this.startDnaLoop;
    this.onSetCycle();
  }

  ngOnInit() {
  }

  startDnaLoop() {
    this.timer = setInterval( ()=> {
      this.dnaLoop();
    }, this.interval );
  }

  dnaLoop() {
    this.newInterval++;
  }

  onSetCycle() {
    clearInterval(this.timer);
    // Line below is just to offer a bit of feedback onSetCycle change
    this.newInterval = this.interval;
    setTimeout(1000);
    this.startDnaLoop();
  }

}

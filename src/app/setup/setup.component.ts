import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  timer: number;
  aiName: string = 'My AI';
  // @Output() newDnaCycle = new EventEmitter<number>();
  cycle = 1000;   // nr or miliseconds for the DNA Loop cycle
  loop = 100;

  constructor() { 
    this.startDnaLoop;
  }

  startDnaLoop() {
    this.timer = setInterval( ()=> {
      this.dnaLoop();
    }, this.cycle );
  }

  dnaLoop() {
    this.loop++;
  }

  ngOnInit() {
  }

  onSetCycle() {
    clearInterval(this.timer);
    this.loop = this.cycle;
    setTimeout(1000);
    this.startDnaLoop();
  }

}

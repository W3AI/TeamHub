import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

aiName: string = 'My AI';
aiCycle: number = 1000;   // nr or miliseconds for the AI Loop cycle

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // TODO - Ongoing should be a list of projects not just one
  ongoingProject = false;

  constructor() { }

  ngOnInit() {
  }

}

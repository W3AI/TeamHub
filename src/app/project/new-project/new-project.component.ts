import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

   tasks: Observable<any>;

  constructor(
    private projectService: ProjectService, 
    private db: AngularFirestore) { }

  ngOnInit() {
    this.tasks = this.db
    .collection('availableTasks')
    .valueChanges();
  }

  onStartProject(form: NgForm) {
    this.projectService.startTask( form.value.task );
  }
}

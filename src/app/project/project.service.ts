import { Task } from "./task.model";

// Naming Convention:
// project.service is meant To manage all tasks/services/skills we know 
// as well as completed and cancelled tasks/steps
// named project.service instead of task.service
// in order to keep the naming rule/convention of: training ~ project 
// as per Max S. training project

export class ProjectService {
    availableTasks: Task[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
}
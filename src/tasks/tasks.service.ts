import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {v1 as uuidv1} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    private  tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }
    getTaskById(id : string): Task{
       const found =  this.tasks.find(task=> task.id === id)
        if(!found){
            throw new NotFoundException()
        }
        return found
    }
    createTask(createTaskDTO: CreateTaskDto): Task{
        const {title, description}= createTaskDTO
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }
    deleteTask(id : string): void{
       this.tasks = this.tasks.filter(task=> task.id === id)
    }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TaskRepository} from "./task.repository";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
) {
}


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
     return  this.taskRepository.getTasks(filterDto)
    }

    async getTaskById(id : number): Promise<Task> {
        const  found = await this.taskRepository.findOne(id)
        if(!found){
                    throw new NotFoundException()
                }
                return found;
    }


    async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {

        return  this.taskRepository.createTask(createTaskDTO);
    }
    async deleteTask(id : number): Promise<void>{
        const  found = await this.taskRepository.delete(id)
        if(found.affected === 0){
            throw new NotFoundException(`task with id ${id} not found `)
        }
        console.log(found)



    }
    async updateTaskStatus(id : number, status : TaskStatus): Promise<Task>{
        const  task = await this.getTaskById(id)
        task.status = status
        await task.save()
        return task;
    }

}

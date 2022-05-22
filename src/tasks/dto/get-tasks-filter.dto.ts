import {TaskStatus} from "../task-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetTasksFilterDto{
   @IsOptional()
   @IsIn([TaskStatus.DoNE,TaskStatus.OPEN,TaskStatus.IN_PROGRES])
   status: TaskStatus
   @IsOptional()
   @IsNotEmpty()
   search: string
}
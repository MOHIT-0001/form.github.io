import Task from "./task.js";

export const taskOperations = {
    tasks: [],
    getAllTask() {
      return this.tasks;
    
    },
    
    add(name, age, phone, desc, image) {
      const task = new Task(name, age, phone, desc, image);
      this.tasks.push(task);
      console.log("Added ", this.tasks);
      return task;
    },
}
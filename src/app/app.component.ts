import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode : string = 'list';
  public todos : Todo[] = [];
  public title : string = 'Lista de Tarefas!';
  public form : FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

  remove(todo : Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsClick(
    todo : Todo,
    action : boolean) {
      todo.done = action;
      this.save();
  }

  addTask(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clearForm();
  }

  clearForm(){
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() { 
    const data = JSON.parse(localStorage.getItem('todos'));
    if(data){
      this.todos = data;
    }
    
  }

  changeMod(mode: string) {
    this.mode=mode;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, Todo } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {

  }

  allTodo: Todo[];
  addTodoForm: FormGroup;
  ADD_TODO: string = "Add Todo";
  UPDATE_TODO: string = "Update Todo";
  addButtonTitle: string = this.ADD_TODO;
  seletedTodoId: string;
  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required])
    });
    this.seletedTodoId = null;
    this.addButtonTitle = this.ADD_TODO;
    this.dataService.getAllTodo().subscribe(result => {
      this.allTodo = result;
    });

  };

  deleteTodo(_id: string) {
    this.dataService.deleteTodo(_id);
  }
  addTodo() {
    for (const key in this.addTodoForm.controls) {
      this.addTodoForm.controls[key].markAsDirty();
    }
    if (this.addTodoForm.valid) {
      this.dataService.addTodo(this.addTodoForm.value.title, this.addTodoForm.value.details);
      this.addTodoForm.reset({ title: '', details: '' });
      this.addButtonTitle = this.ADD_TODO;
    }

  }

  editTodo(todo: Todo) {
    this.seletedTodoId = todo._id;
    this.addButtonTitle = this.UPDATE_TODO;
    this.addTodoForm.patchValue({
      title: todo.title,
      details: todo.details
    });
  }
  updateTodo() {
    for (const key in this.addTodoForm.controls) {
      this.addTodoForm.controls[key].markAsDirty();
    }
    if (this.addTodoForm.valid) {
      this.dataService.updateTodo(this.seletedTodoId, this.addTodoForm.value.title, this.addTodoForm.value.details);
      this.seletedTodoId = null;
      this.addTodoForm.reset({ title: '', details: '' });
      this.addButtonTitle = this.ADD_TODO;
    }
  }
}


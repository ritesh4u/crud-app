import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {

  }
  BASE_URL = "http://localhost:3000/api";
  TODO_PATH = `${this.BASE_URL}/todo`;
  allTodo: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  getAllTodo(): Observable<Todo[]> {
    this.httpClient.get<TodoResponse>(this.TODO_PATH).subscribe(result => {
      console.log(result);
      if (result.success) {
        this.allTodo.next(result.todos);
      } else {
        this.allTodo.next([]);
      }

    });
    return this.allTodo;
  }
  addTodo(title: string, details: string) {
    this.httpClient.post<Todo>(this.TODO_PATH, { title, details }).subscribe(result => {
      let newTodoList = [...this.allTodo.value, result];
      this.allTodo.next(newTodoList);
    });
  }
  deleteTodo(_id: string) {
    let params = new HttpParams();
    params = params.set('id', _id);
    this.httpClient.delete<CommonResponse>(this.TODO_PATH, { params: params }).subscribe(result => {
      if (result.success) {
        let filteredList = this.allTodo.value.filter(it => it._id != _id);
        this.allTodo.next(filteredList);
      }
    });
  }
  updateTodo(_id: string, title: string, details: string) {
    this.httpClient.put<Todo>(this.TODO_PATH, { _id, title, details }).subscribe(result => {
      console.log(result);
      let todo = this.allTodo.value.find(it => it._id == _id);
      todo.title = title;
      todo.details = details;
      let newTodoList = [...this.allTodo.value];
      this.allTodo.next(newTodoList);
    });
  }
}
interface CommonResponse {
  success: boolean;
  message: string;
}
interface TodoResponse extends CommonResponse {
  todos: [];
}
export interface Todo {
  _id: string,
  title: string,
  details: string;
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.dataService.getAllTodo().subscribe(result => {
      this.allTodo = result;
    });

  };

  deleteTodo(_id: string) {
    this.dataService.deleteTodo(_id);
  }
  addTodo() {
    this.dataService.addTodo('New Test', `New Details ${Math.random()}`);
  }
}


import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppService} from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'X-men Movies';
  movies = null;
  detail: Object;
  searchMovie: string;
  error: string;
  inYear: Number = null;
  constructor(private appService: AppService, private titleService: Title){}
  ngOnInit() {
    this.appService.getData().subscribe((res)=> {
      if(res.Response === "True") {
        this.movies = res.Search;
      } else {
        this.error = res.Error;
      }

    });
    this.titleService.setTitle( this.title );
  }

  getDetails(index: number) {
    this.appService.getDetail(this.movies[index].imdbID).subscribe((res)=> {
      this.detail = res;
    })
  }
  search() {
    if(this.searchMovie) {
      this.movies= null;
      this.title = this.searchMovie;
      this.titleService.setTitle( this.title );
      this.appService.getData(this.searchMovie, this.inYear).subscribe((res)=> {
        if(res.Response === "True") {
          this.movies = res.Search;
        } else {
          this.error = res.Error;
        }
      });
    } else {
      this.movies = null;
      this.error = "name of movie required"
    }

  }
}

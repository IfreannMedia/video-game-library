import { ApiResponse } from './../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort: string = "";
  public games: Array<Game> = [];
  
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=> {
      if(params['game-search']){
        this.searchGames('metacritic', params['game-search']);
      } else {
        this.searchGames('metacritic');
      }
    })
  }

  searchGames(sort: string, search?: string) {
    this.httpService.getGameList(sort, search).subscribe((gameList: ApiResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);
      console.log('---------------');
      console.log(this.games);
    });
  }

}

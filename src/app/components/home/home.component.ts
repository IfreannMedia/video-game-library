import { ApiResponse } from './../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string = "";
  public games: Array<Game> = [];
  public nextPageUrl: string = "";
  public previousPageUrl: string = "";

  private routeSub: Subscription = new Subscription();
  private gameSub: Subscription = new Subscription();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=> {
      if(params['game-search']){
        this.searchGames('metacritic', params['game-search']);
      } else {
        this.searchGames('metacritic');
      }
    })
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  searchGames(sort: string, search?: string): void {
   this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: ApiResponse<Game>)=>{
      this.games = gameList.results;
      this.nextPageUrl = gameList.next;
      this.previousPageUrl = gameList.previous;
      console.log(gameList);
      console.log('---------------');
      console.log(this.games);
    });
  }

  openGameDetails(gameId: string): void {
    this.router.navigate(['details', gameId]);
  }

}

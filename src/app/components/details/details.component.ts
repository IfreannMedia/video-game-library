import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from './../../models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public gameRating = 0;
  public gameId: string;
  public game: Game;
  routeSub: Subscription = new Subscription();
  gameSub: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.gameSub.unsubscribe();
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((game: Game) => {
      this.game = game;
      console.log('got game details: ', game);
      setTimeout(()=>{
        this.gameRating = this.game.metacritic;
      },1);
    })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return 'f7aa38';
    } else {
      return 'ef4655';
    }
  }

}

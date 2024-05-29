import { Component, OnInit,inject } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection,collectionData,addDoc,doc,getDoc, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game: Game = new Game;
  gameId: string = '';
  gameOver = false;
  games$!: Observable<any[]>;
  
  constructor(private route: ActivatedRoute,private firestore: Firestore = inject(Firestore), public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.gameId = params['id'];
  
      console.log(this.gameId);
  
      if (this.gameId) {
        const gameDocRef = doc(this.firestore, 'games', this.gameId);
        const gameDoc = await getDoc(gameDocRef);
  
        if (gameDoc.exists()) {
          const gameData = gameDoc.data() as Game;
          console.log('Retrieved game from Firestore:', gameData);
          this.game.currentPlayer = gameData.currentPlayer;
          this.game.players = gameData.players;
          this.game.player_images = gameData.player_images;
          this.game.playedCards = gameData.playedCards;
          this.game.stack = gameData.stack;
          this.game.pickCardAnimation = gameData.pickCardAnimation;
          this.game.currentCard = gameData.currentCard;
        } else {
          console.log('No such document!');
        }
      }
    });
  
    const aCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(aCollection);
  
    this.games$.subscribe((games: any[]) => {
      console.log('Retrieved games from Firestore:', games);
    });
  }

  newGame(){
    this.game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
  
    addDoc(gamesCollection,  this.game.toJson())
  }

  takeCard(){
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }else if (!this.game.pickCardAnimation) {
    const card = this.game.stack.pop();
    if (card) {
      this.game.currentCard = card;
      this.game.pickCardAnimation = true;
      console.log('New Card:', this.game.currentCard);
      console.log('Game is', this.game);
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('profile.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    updateDoc(doc(this.firestore, 'games', this.gameId), this.game.toJson());
  }

  editPlayer(playerId:number){
    console.log('Edit Player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received',change);
      if(change){
        if(change == 'DELETE'){
          this.game.players.splice(playerId,1);
          this.game.player_images.splice(playerId,1);
        } else{
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }
}


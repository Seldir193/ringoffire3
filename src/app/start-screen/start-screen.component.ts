import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc  } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: Firestore,private router: Router){

  }

  ngOnInit(): void {
    
  }

  async newGame() {
    let game = new Game();
    try {
      const gameCollection = collection(this.firestore, 'games');
      const gameInfo = await addDoc(gameCollection, game.toJson());
      this.router.navigateByUrl('/game/' + gameInfo.id); // Korrigiert den Navigationsaufruf
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}

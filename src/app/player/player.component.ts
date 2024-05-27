import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {

  @Input() name: string = '';
  @Input() playerAktive: boolean = false;

  constructor(){}

  ngOnInit(): void {
    
  }

}

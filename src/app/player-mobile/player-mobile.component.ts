import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent implements OnInit {

  @Input() name: string = '';
  @Input() image: string = '';
  @Input() playerAktive: boolean = false;

  constructor(){}

  ngOnInit(): void {
    
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['profile.png','lady.png','monkey.png','lol.png','könig.png'];

  constructor(){}

  ngOnInit(): void {
    
  }

}

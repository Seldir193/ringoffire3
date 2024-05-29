import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['profile.png','lady.png','monkey.png','lol.png','könig.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}

  ngOnInit(): void {
    
  }



}

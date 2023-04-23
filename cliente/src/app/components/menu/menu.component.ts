import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  time = '';
  date = '';
  imageUrl = 'https://cdn-icons-png.flaticon.com/512/3264/3264822.png';

  constructor( ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      const currentTime = new Date();
      this.time = currentTime.toLocaleTimeString();
      this.date = currentTime.toLocaleDateString();
    }, 1000);
  }


}

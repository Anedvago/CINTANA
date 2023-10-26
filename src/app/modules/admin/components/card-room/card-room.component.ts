import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-room',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css'],
})
export class CardRoomComponent implements OnChanges {
  @Input()
  public color1!: string;
  @Input()
  public color2!: string;
  @Input()
  public numRooms!: number;
  @Input()
  public text!: string;

  public totalNumberRooms: number = 10;
  public porcent: number = (this.numRooms * 100) / this.totalNumberRooms;

  ngOnChanges(changes: SimpleChanges): void {
    this.porcent = (this.numRooms * 100) / this.totalNumberRooms;
  }
}

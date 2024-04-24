import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-blue',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-blue.component.html',
  styleUrls: ['./button-blue.component.css'],
})
export class ButtonBlueComponent {
  @Input() desactivado: boolean = false;
  @Output()
  public pressClick: EventEmitter<void> = new EventEmitter<void>();

  public clicked(): void {
    this.pressClick.emit();
  }
}

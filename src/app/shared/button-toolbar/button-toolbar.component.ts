import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-button-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-toolbar.component.html',
  styleUrls: ['./button-toolbar.component.css'],
})
export class ButtonToolbarComponent {
  @Input()
  public button: any;

  @Output()
  public click: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  public clicked(): void {
    this.click.emit();
    this.router.navigate([`/admin/${this.button.route}`]);
  }
}

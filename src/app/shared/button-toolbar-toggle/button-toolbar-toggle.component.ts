import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-button-toolbar-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-toolbar-toggle.component.html',
  styleUrls: ['./button-toolbar-toggle.component.css'],
})
export class ButtonToolbarToggleComponent {
  @Input()
  public button: any;
  @Input()
  public childrens: any;
  @Output()
  public click: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  public clicked(): void {
    this.click.emit();
    this.router.navigate([`/admin/${this.button.route}`]);
    const indexActive = this.findActive(this.childrens);
    if (indexActive != -1) {
      this.childrens[indexActive].active = false;
    }
  }

  public tabClicked(index: number): void {
    this.router.navigate([`/admin/${this.childrens[index].route}`]);
    const indexActive = this.findActive(this.childrens);
    if (indexActive != -1) {
      this.childrens[indexActive].active = false;
    }
    this.childrens[index].active = true;
  }

  public findActive(list: any[]): number {
    const index = list.findIndex((elem) => {
      return elem.active == true;
    });
    return index;
  }
}

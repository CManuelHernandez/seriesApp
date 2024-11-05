import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagen-helper',
  templateUrl: './imagen-helper.component.html',
  styleUrl: './imagen-helper.component.scss',
})
export class ImagenHelperComponent {
  @Input() helpVisible: boolean = false;
  @Input() helpContent: string = '';

  showHelp() {
    this.helpVisible = true;
  }

  hideHelp() {
    this.helpVisible = false;
  }
}

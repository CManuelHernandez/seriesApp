import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagen-helper',
  templateUrl: './imagen-helper.component.html',
  styleUrl: './imagen-helper.component.scss',
})
export class ImagenHelperComponent {
  @Input() helpVisible: boolean = false;
  @Input() helpContent: string = '';

  /**
   * Displays the help overlay by setting `helpVisible` to true.
   */
  showHelp() {
    this.helpVisible = true;
  }

  /**
   * Hides the help overlay by setting `helpVisible` to false.
   */
  hideHelp() {
    this.helpVisible = false;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.css']
})
export class ToolPanelComponent {

  text: string;
  @Output() checkChanging = new EventEmitter<boolean>

  constructor() {
    this.text = 'Покрасить в рандомный цвет';
  }

  ngOnInit() {
  }

  checking(event: any) {
    this.checkChanging.emit(event.target.checked)
  }
}

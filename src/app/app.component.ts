import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'my-cesium-projcet';
  activate: boolean = false;

  change(val: boolean) {
    this.activate = val;
  }
}

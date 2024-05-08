import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumMapDirective } from './cesium-map.directive';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumMapDirective,
    ToolPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

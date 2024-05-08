import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPanelComponent } from './tool-panel.component';

describe('ToolPanelComponent', () => {
  let component: ToolPanelComponent;
  let fixture: ComponentFixture<ToolPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolPanelComponent]
    });
    fixture = TestBed.createComponent(ToolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

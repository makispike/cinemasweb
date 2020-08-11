import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningsListComponent } from './screenings-list.component';

describe('ScreeningsListComponent', () => {
  let component: ScreeningsListComponent;
  let fixture: ComponentFixture<ScreeningsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

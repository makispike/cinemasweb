import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectedComponent } from './redirected.component';

describe('RedirectedComponent', () => {
  let component: RedirectedComponent;
  let fixture: ComponentFixture<RedirectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

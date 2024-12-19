import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantaDashboardComponent } from './santa-dashboard.component';

describe('SantaDashboardComponent', () => {
  let component: SantaDashboardComponent;
  let fixture: ComponentFixture<SantaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SantaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SantaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

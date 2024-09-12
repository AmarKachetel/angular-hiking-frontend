import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateReviewsComponent } from './moderate-reviews.component';

describe('ModerateReviewsComponent', () => {
  let component: ModerateReviewsComponent;
  let fixture: ComponentFixture<ModerateReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerateReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerateReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

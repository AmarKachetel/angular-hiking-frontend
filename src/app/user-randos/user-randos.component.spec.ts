import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRandosComponent } from './user-randos.component';

describe('UserRandosComponent', () => {
  let component: UserRandosComponent;
  let fixture: ComponentFixture<UserRandosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRandosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

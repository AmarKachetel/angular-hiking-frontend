import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesRandosComponent } from './mes-randos.component';

describe('MesRandosComponent', () => {
  let component: MesRandosComponent;
  let fixture: ComponentFixture<MesRandosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesRandosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesRandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

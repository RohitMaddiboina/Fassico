import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsChildComponent } from './items-child.component';

describe('ItemsChildComponent', () => {
  let component: ItemsChildComponent;
  let fixture: ComponentFixture<ItemsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

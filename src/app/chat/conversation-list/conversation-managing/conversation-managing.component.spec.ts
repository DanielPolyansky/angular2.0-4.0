import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationManagingComponent } from './conversation-managing.component';

describe('ConversationManagingComponent', () => {
  let component: ConversationManagingComponent;
  let fixture: ComponentFixture<ConversationManagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationManagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

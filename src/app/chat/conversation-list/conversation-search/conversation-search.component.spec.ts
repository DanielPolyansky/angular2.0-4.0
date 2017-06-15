import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSearchComponent } from './conversation-search.component';

describe('ConversationSearchComponent', () => {
  let component: ConversationSearchComponent;
  let fixture: ComponentFixture<ConversationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

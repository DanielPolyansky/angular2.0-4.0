import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { MessageListComponent } from './chat/message-list/message-list.component';
import { MessageComponent } from './chat/message-list/message/message.component';
import { MessageSearchComponent } from './chat/message-list/message/message-search/message-search.component';
import { MessageInputComponent } from './chat/message-list/message/message-search/message-input/message-input.component';
import { ConversationComponent } from './chat/conversation-list/conversation/conversation.component';
import { ConversationSearchComponent } from './chat/conversation-list/conversation-search/conversation-search.component';
import { ConversationManagingComponent } from './chat/conversation-list/conversation-managing/conversation-managing.component';
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ConversationListComponent,
    MessageListComponent,
    MessageComponent,
    MessageSearchComponent,
    MessageInputComponent,
    ConversationComponent,
    ConversationSearchComponent,
    ConversationManagingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

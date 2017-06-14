import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegiterComponent } from './regiter/regiter.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    RegiterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

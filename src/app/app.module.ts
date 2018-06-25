import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './reader/header/header.component';
import { InHeaderComponent } from './reader/header/in-header/in-header.component';
import { OutHeaderComponent } from './reader/header/out-header/out-header.component';
import { PassMatchDirective } from './users/pass-match.directive';
import { DisplayComponent } from './display/display.component';
import { DropdownComponent } from './users/dropdown/dropdown.component';
import { AuthInterceptor } from './reader/auth.interceptor';
import { JogListComponent } from './jogs/jog-list/jog-list.component';
import { JogComponent } from './jogs/jog-list/jog/jog.component';
import { JogEditComponent } from './jogs/jog-edit/jog-edit.component';
import { JogWrapperComponent } from './jogs/jog-wrapper/jog-wrapper.component';
import { NewJogComponent } from './jogs/new-jog/new-jog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InHeaderComponent,
    OutHeaderComponent,
    PassMatchDirective,
    DisplayComponent,
    DropdownComponent,
    JogListComponent,
    JogComponent,
    JogEditComponent,
    JogWrapperComponent,
    NewJogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

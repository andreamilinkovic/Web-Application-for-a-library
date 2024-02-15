import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CitalacComponent } from './citalac/citalac.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { IstorijatComponent } from './istorijat/istorijat.component';
import { BookComponent } from './book/book.component';
import { SearchComponent } from './search/search.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookRequestComponent } from './book-request/book-request.component';
import { AboutUsersComponent } from './about-users/about-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AboutBooksComponent } from './about-books/about-books.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SearchGuestComponent } from './search-guest/search-guest.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    CitalacComponent,
    ModeratorComponent,
    AdminComponent,
    SignupComponent,
    ChangePasswordComponent,
    ZaduzenjaComponent,
    IstorijatComponent,
    BookComponent,
    SearchComponent,
    NewBookComponent,
    BookRequestComponent,
    AboutUsersComponent,
    UpdateUserComponent,
    AboutBooksComponent,
    UpdateBookComponent,
    AdminLoginComponent,
    SearchGuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

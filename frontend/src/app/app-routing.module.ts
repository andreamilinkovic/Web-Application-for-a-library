import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutBooksComponent } from './about-books/about-books.component';
import { AboutUsersComponent } from './about-users/about-users.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { BookRequestComponent } from './book-request/book-request.component';
import { BookComponent } from './book/book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CitalacComponent } from './citalac/citalac.component';
import { HomeComponent } from './home/home.component';
import { IstorijatComponent } from './istorijat/istorijat.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { NewBookComponent } from './new-book/new-book.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchGuestComponent } from './search-guest/search-guest.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "profile", component: ProfileComponent},
  {path: "citalac", component: CitalacComponent},
  {path: "moderator", component: ModeratorComponent},
  {path: "admin", component: AdminComponent},
  {path: "change_password", component: ChangePasswordComponent},
  {path: "zaduzenja", component: ZaduzenjaComponent},
  {path: "istorijat", component: IstorijatComponent},
  {path: "book", component: BookComponent},
  {path: "search", component: SearchComponent},
  {path: "new_book", component: NewBookComponent},
  {path: "book_request", component: BookRequestComponent},
  {path: "about_users", component: AboutUsersComponent},
  {path: "update_user", component: UpdateUserComponent},
  {path: "about_books", component: AboutBooksComponent},
  {path: "update_book", component: UpdateBookComponent},
  {path: "admin_login", component: AdminLoginComponent},
  {path: "search_guest", component: SearchGuestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

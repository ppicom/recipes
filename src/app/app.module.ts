import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import HeaderComponent from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

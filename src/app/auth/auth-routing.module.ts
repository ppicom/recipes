import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
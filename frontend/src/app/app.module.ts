import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// tslint:disable-next-line:max-line-length
import { MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatFormFieldModule, MatStepperModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { StatsComponent } from './components/stats/stats.component';
import { EntryService } from './services/entry.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'list', component: ListComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    StatsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, FormsModule, MatStepperModule,
    FlexLayoutModule,
    // tslint:disable-next-line:max-line-length
    MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatSnackBarModule,
    MomentDateModule
  ],
  providers: [EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

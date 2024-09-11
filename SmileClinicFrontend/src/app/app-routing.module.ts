import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{ path: '', component: HomeComponent}
  ,{
    path: 'clinic',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/clinic/dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: '',
      //   loadChildren:
      //     () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
      // },

      //Lazy Loading
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate:[AuthGuard], 
       data:{expectedRoles: ['user']}
      },
      {
        path: 'bookAppointment',
        loadChildren: () => import('./book-appointment/book-appointment.module').then(m => m.BookAppointmentModule),
        canActivate:[AuthGuard], 
        data:{expectedRoles:['user']}
      },
      {
        path: 'adminDashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
        canActivate:[AuthGuard], 
        data:{expectedRoles: ['admin']}
      },
    ]
  },
  { path: '**', redirectTo:"/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

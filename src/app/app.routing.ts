import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProjectComponent } from './project/project.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'taskboard',
                component: TaskboardComponent,
                data: {
                    title: 'Taskboard',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Taskboard' }
                    ]
                }
            },
            {
                path: 'leaderboard',
                component: LeaderboardComponent,
                data: {
                    title: 'Leaderboard',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Leaderboards' }
                    ]
                }
            },
            {
                path: 'project',
                component: ProjectComponent,
                data: {
                    title: 'Project',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Project' }
                    ]
                }
            },
            {
                path: 'collaborator',
                component: CollaboratorComponent,
                data: {
                    //title: 'Colaborator',
                    title: 'Colaborator List',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Collaborator List' }
                    ]
                }
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard',
                    // urls: [
                    //     { title: 'Dashboard', url: '/dashboard' },
                    //     { title: 'Taskboard' }
                    // ]
                }
            },
            
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];

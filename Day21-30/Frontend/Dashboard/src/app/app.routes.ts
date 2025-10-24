import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Signup } from './component/signup/signup';
import { Orders } from './component/orders/orders';
import { Dashboard } from './component/dashboard/dashboard';
import { Inventory } from './component/inventory/inventory';
import { Tracking } from './component/tracking/tracking';
import { ReportAnalytics } from './component/report-analytics/report-analytics';
import { UserAuthentication } from './component/user-authentication/user-authentication';
import { Setting } from './component/setting/setting';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'signup', component: Signup},
    {path: 'login', component: Login},
    {path: 'dashboard', component: Dashboard},
    {path: 'inventory', component: Inventory},
    {path: 'tracking', component: Tracking},
    {path: 'orders', component: Orders},
    {path: 'report-analytics', component: ReportAnalytics},
    {path: 'user-authentication', component: UserAuthentication},
    {path: 'setting', component: Setting}
];

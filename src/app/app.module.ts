import { ProductsService } from './service/products.service';
import { OrderOngoingComponent } from './admin/order-ongoing/order-ongoing.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment'

import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { AboutUsUserComponent } from './user/about-us-user/about-us-user.component';
import { ProductsUserComponent } from './user/products-user/products-user.component';
import { FaqsUserComponent } from './user/faqs-user/faqs-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { SignupUserComponent } from './user/signup-user/signup-user.component';
import { CheckoutUserComponent } from './user/checkout-user/checkout-user.component';
import { MyAccountUserComponent } from './user/my-account-user/my-account-user.component';
import { SelectedItemUserComponent } from './user/selected-item-user/selected-item-user.component';
import { ShoppingCartUserComponent } from './user/shopping-cart-user/shopping-cart-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { InventoryAdminComponent } from './admin/inventory-admin/inventory-admin.component';
import { ProductEditAdminComponent } from './admin/product-edit-admin/product-edit-admin.component';
import { ProductNewAdminComponent } from './admin/product-new-admin/product-new-admin.component';
import { AccountsRegisteredAdminComponent } from './admin/accounts-registered-admin/accounts-registered-admin.component';
import { AccountsNewAdminComponent } from './admin/accounts-new-admin/accounts-new-admin.component';
import { AccountEditAdminComponent } from './admin/account-edit-admin/account-edit-admin.component';
import { OrderTopayComponent } from './admin/order-topay/order-topay.component';
import { OrderPendingComponent } from './admin/order-pending/order-pending.component';
import { OrderDeliveryComponent } from './admin/order-delivery/order-delivery.component';
import { OrderCancelComponent } from './admin/order-cancel/order-cancel.component';
import { OrderHistoryComponent } from './admin/order-history/order-history.component';
import { OrderSidenavComponent } from './admin/order-sidenav/order-sidenav.component';
import { ItemCartComponent } from './template/item-cart/item-cart.component';
import { ItemCheckoutComponent } from './template/item-checkout/item-checkout.component';
import { MyaccountTopayComponent } from './template/myaccount-topay/myaccount-topay.component';
import { MyaccountToreceiveComponent } from './template/myaccount-toreceive/myaccount-toreceive.component';
import { SignupComponent } from './template/signup/signup.component';
import { OrderPendingDetailsComponent } from './template/order-pending-details/order-pending-details.component';
import { OrderHistoryDetailsComponent } from './template/order-history-details/order-history-details.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { CheckoutDiffAddressComponent } from './template/checkout-diff-address/checkout-diff-address.component';
import { AuthenticationInterceptorService } from './service/authentication.interceptor.service';
import { UserAuthenticationGuard } from './route-guard/user.authentication.guard';
import { SignInGuard } from './route-guard/sign-in.guard';
import { AdminGuard } from './route-guard/admin.guard';
import { AdminAuthInterceptorService } from './service/adminauth.interceptor.service';
import { LoginAdminGuard } from './route-guard/login-admin.guard';
import { NewProductDynamicComponent } from './template/new-product-dynamic/new-product-dynamic.component';
import { EditAdminGuard } from './route-guard/edit-admin.guard';
import { EditProductDynamicComponent } from './template/edit-product-dynamic/edit-product-dynamic.component';
import { LoadingSpinner } from './template/spinners/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent,
    HomeUserComponent,
    AboutUsUserComponent,
    ProductsUserComponent,
    FaqsUserComponent,
    ShoppingCartUserComponent,
    LoginUserComponent,
    SignupUserComponent,
    CheckoutUserComponent,
    MyAccountUserComponent,
    SelectedItemUserComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    InventoryAdminComponent,
    ProductEditAdminComponent,
    ProductNewAdminComponent,
    AccountsRegisteredAdminComponent,
    AccountsNewAdminComponent,
    AccountEditAdminComponent,
    OrderTopayComponent,
    OrderPendingComponent,
    OrderDeliveryComponent,
    OrderCancelComponent,
    OrderHistoryComponent,
    OrderSidenavComponent,
    OrderOngoingComponent,
    ItemCartComponent,
    ItemCheckoutComponent,
    MyaccountTopayComponent,
    MyaccountToreceiveComponent,
    SignupComponent,
    OrderPendingDetailsComponent,
    OrderHistoryDetailsComponent,
    NavbarAdminComponent,
    CheckoutDiffAddressComponent,
    NewProductDynamicComponent,
    EditProductDynamicComponent,
    LoadingSpinner
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule ,
    BsDropdownModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeUserComponent},
      {path: 'faqs', component: FaqsUserComponent},
      {path: 'about-us', component: AboutUsUserComponent},
      {path: 'products-user', component: ProductsUserComponent},
      {path: 'shopping-cart', component: ShoppingCartUserComponent},
      {path: 'login-user', component: LoginUserComponent, canActivate:[SignInGuard]},
      {path: 'signup-user', component: SignupUserComponent, canActivate:[SignInGuard]},
      {path: 'check-out', component:CheckoutUserComponent},
      {path: 'my-account', component: MyAccountUserComponent, canActivate:[UserAuthenticationGuard]},
      {path: 'selected-item/:id', component:SelectedItemUserComponent},
      {path: 'login-admin', component: LoginAdminComponent, canActivate:[LoginAdminGuard]},
      {path: 'dashboard-admin', component: DashboardAdminComponent, canActivate:[AdminGuard]},
      {path: 'inventory', component:InventoryAdminComponent, canActivate:[AdminGuard]},
      {path: 'product-edit/:id', component: ProductEditAdminComponent, canActivate:[AdminGuard]},
      {path: 'product-new', component: ProductNewAdminComponent, canActivate:[AdminGuard]},
      {path: 'accounts-registered', component: AccountsRegisteredAdminComponent, canActivate:[AdminGuard]},
      {path: 'account-new', component: AccountsNewAdminComponent, canActivate:[AdminGuard]},
      {path: 'account-edit', component: AccountEditAdminComponent, canActivate:[AdminGuard, EditAdminGuard]},
      {path: 'orders-topay', component: OrderTopayComponent, canActivate:[AdminGuard]},
      {path: 'orders-pending', component: OrderPendingComponent, canActivate:[AdminGuard]},
      {path: 'orders-delivery', component: OrderDeliveryComponent, canActivate:[AdminGuard]},
      {path: 'orders-ongoing', component: OrderOngoingComponent, canActivate:[AdminGuard]},
      {path:'orders-cancel', component:OrderCancelComponent, canActivate:[AdminGuard]},
      {path:'orders-history', component: OrderHistoryComponent, canActivate:[AdminGuard]},
    ]),
      
  ],
  providers: [
    ProductsService,
    BsDropdownConfig,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

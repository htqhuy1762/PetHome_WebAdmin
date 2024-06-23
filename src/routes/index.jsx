// Layouts
import Login from '~/pages/Login';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    // { path: '/register', component: Register, layout: null },
    // { path: '/forgotpassword', component: ForgotPassword, layout: null },
    // { path: '/items', component: Item },
    // { path: '/services', component: ServicePet },
    // { path: '/services/:id', component: ServiceDetail, layout: HeaderFooter },
    // { path: '/services/requested/:id', component: ServiceRequestedInfo, layout: HeaderFooter },
    // { path: '/blogs', component: Blog },
    // { path: '/blogs/myblog', component: MyBlog },
    // { path: '/pets', component: Pet },
    // { path: '/pets/:id', component: PetDetail, layout: HeaderFooter },
    // { path: '/pets/requested/:id', component: PetRequestedInfo, layout: HeaderFooter },
    // { path: '/pets/type/:type', component: PetTypePage, layout: HeaderFooter },
    // { path: '/items/:id', component: ItemDetail, layout: HeaderFooter },
    // { path: '/items/requested/:id', component: ItemRequestedInfo, layout: HeaderFooter },
    // { path: '/items/type/:type', component: ItemTypePage, layout: HeaderFooter },
    // { path: '/search/pets/', component: SearchPet, layout: HeaderFooter },
    // { path: '/search/items/', component: SearchItem, layout: HeaderFooter },
];

const privateRoutes = [
    // { path: '/user/account/profile', component: Profile, layout: UserLayout },
    // { path: '/user/shop', component: MyShop, layout: UserLayout },
    // { path: '/user/shop/subcribe', component: ShopSubcribe, layout: UserLayout },
    // { path: '/user/shop/register', component: ShopRegister, layout: UserLayout },
    // { path: '/user/shop/complete', component: CompletedRegisterShop, layout: UserLayout },
    // { path: '/user/shop/management', component: ShopManagement, layout: ShopManagementLayout },
    // { path: '/user/shop/management/pet', component: ManagementPet, layout: ShopManagementLayout },
    // { path: '/user/shop/management/item', component: ManagementItem, layout: ShopManagementLayout },
    // { path: '/user/shop/management/service', component: ManagementService, layout: ShopManagementLayout },
    // { path: '/user/shop/management/profile', component: ShopProfile, layout: ShopManagementLayout },
    // { path: '/user/shop/management/address', component: AddressShop, layout: ShopManagementLayout },
    // { path: '/user/shop/management/bill', component: ManagementBill, layout: ShopManagementLayout },
    // { path: '/user/account/address', component: AddressUser, layout: UserLayout },
    // { path: '/user/account/changepass', component: ChangePass, layout: UserLayout },
    // { path: '/cart', component: Cart, layout: HeaderFooter },
    // { path: '/checkout', component: Checkout, layout: HeaderFooter },
    // { path: '/user/purchase', component: Purchase, layout: UserLayout },
    // { path: '/user/account/payment', component: Payment, layout: UserLayout },
];

export { publicRoutes, privateRoutes };

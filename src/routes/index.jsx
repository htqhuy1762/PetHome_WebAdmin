// Layouts
import { HeaderFooter, UserLayout, ShopManagementLayout } from '~/layouts';

import Login from '~/pages/Login';
// import Register from '~/pages/AuthPage/Register';
// import Pet from '~/pages/PetPage/Pet';
// import Profile from '~/pages/UserPage/Profile';
// import Blog from '~/pages/BlogPage/Blog';
// import Item from '~/pages/ItemPage/Item';
// import ServicePet from '~/pages/ServicePage/ServicePet';
// import PetDetail from '~/pages/PetPage/PetDetail';
// import ItemDetail from '~/pages/ItemPage/ItemDetail';
// import Cart from '~/pages/CartPage/Cart';
// import SearchPet from '~/pages/PetPage/SearchPet';
// import SearchItem from '~/pages/ItemPage/SearchItem';
// import ShopSubcribe from '~/pages/ShopPage/ShopSubcribe';
// import ShopRegister from '~/pages/ShopPage/ShopRegister';
// import AddressUser from '~/pages/UserPage/AddressUser';
// import PetTypePage from '~/pages/PetPage/PetTypePage';
// import ItemTypePage from '~/pages/ItemPage/ItemTypePage';
// import ChangePass from '~/pages/UserPage/ChangePass';
// import CompletedRegisterShop from '~/pages/ShopPage/CompletedRegisterShop';
// import ShopManagement from '~/pages/ShopPage/ShopManagement';
// import MyShop from '~/pages/UserPage/MyShop';
// import MyBlog from '~/pages/BlogPage/MyBlog';
// import ServiceDetail from '~/pages/ServicePage/ServiceDetail';
// import Purchase from '~/pages/UserPage/Purchase';
// import Payment from '~/pages/UserPage/Payment';
// import ManagementPet from '~/pages/ShopPage/ManagementPet';
// import ManagementItem from '~/pages/ShopPage/ManagementItem';
// import ManagementService from '~/pages/ShopPage/ManagementService';
// import ForgotPassword from '~/pages/AuthPage/ForgotPassword';
// import ServiceRequestedInfo from '~/pages/ServicePage/ServiceRequestedInfo';
// import ItemRequestedInfo from '~/pages/ItemPage/ItemRequestedInfo';
// import PetRequestedInfo from '~/pages/PetPage/PetRequestedInfo';
// import AddressShop from '~/pages/ShopPage/AddressShop';
// import ShopProfile from '~/pages/ShopPage/ShopProfile';
// import Checkout from '~/pages/CheckoutPage/Checkout';
// import ManagementBill from '~/pages/ShopPage/ManagementBill';

const publicRoutes = [
    { path: '/', component: Pet },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/forgotpassword', component: ForgotPassword, layout: null },
    { path: '/items', component: Item },
    { path: '/services', component: ServicePet },
    { path: '/services/:id', component: ServiceDetail, layout: HeaderFooter },
    { path: '/services/requested/:id', component: ServiceRequestedInfo, layout: HeaderFooter },
    { path: '/blogs', component: Blog },
    { path: '/blogs/myblog', component: MyBlog },
    { path: '/pets', component: Pet },
    { path: '/pets/:id', component: PetDetail, layout: HeaderFooter },
    { path: '/pets/requested/:id', component: PetRequestedInfo, layout: HeaderFooter },
    { path: '/pets/type/:type', component: PetTypePage, layout: HeaderFooter },
    { path: '/items/:id', component: ItemDetail, layout: HeaderFooter },
    { path: '/items/requested/:id', component: ItemRequestedInfo, layout: HeaderFooter },
    { path: '/items/type/:type', component: ItemTypePage, layout: HeaderFooter },
    { path: '/search/pets/', component: SearchPet, layout: HeaderFooter },
    { path: '/search/items/', component: SearchItem, layout: HeaderFooter },
];

const privateRoutes = [
    { path: '/user/account/profile', component: Profile, layout: UserLayout },
    { path: '/user/shop', component: MyShop, layout: UserLayout },
    { path: '/user/shop/subcribe', component: ShopSubcribe, layout: UserLayout },
    { path: '/user/shop/register', component: ShopRegister, layout: UserLayout },
    { path: '/user/shop/complete', component: CompletedRegisterShop, layout: UserLayout },
    { path: '/user/shop/management', component: ShopManagement, layout: ShopManagementLayout },
    { path: '/user/shop/management/pet', component: ManagementPet, layout: ShopManagementLayout },
    { path: '/user/shop/management/item', component: ManagementItem, layout: ShopManagementLayout },
    { path: '/user/shop/management/service', component: ManagementService, layout: ShopManagementLayout },
    { path: '/user/shop/management/profile', component: ShopProfile, layout: ShopManagementLayout },
    { path: '/user/shop/management/address', component: AddressShop, layout: ShopManagementLayout },
    { path: '/user/shop/management/bill', component: ManagementBill, layout: ShopManagementLayout },
    { path: '/user/account/address', component: AddressUser, layout: UserLayout },
    { path: '/user/account/changepass', component: ChangePass, layout: UserLayout },
    { path: '/cart', component: Cart, layout: HeaderFooter },
    { path: '/checkout', component: Checkout, layout: HeaderFooter },
    { path: '/user/purchase', component: Purchase, layout: UserLayout },
    { path: '/user/account/payment', component: Payment, layout: UserLayout },
];

export { publicRoutes, privateRoutes };
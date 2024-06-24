// Layouts
import Login from '~/pages/AuthPage/Login';
import CustomerRpTicket from '~/pages/CustomerPage/CustomerRpTicket';
import ItemList from '~/pages/ItemPage/ItemList';
import PetList from '~/pages/PetPage/PetList';
import ItemDetail from '~/pages/ItemPage/ItemDetail';
import PetDetail from '~/pages/PetPage/PetDetail';

const publicRoutes = [{ path: '/login', component: Login, layout: null }];

const privateRoutes = [
    { path: '/', component: CustomerRpTicket },
    { path: '/customer/report', component: CustomerRpTicket },
    { path: '/item/list', component: ItemList },
    { path: '/items/:id', component: ItemDetail },
    { path: '/pet/list', component: PetList },
    { path: '/pets/:id', component: PetDetail },
];

export { publicRoutes, privateRoutes };

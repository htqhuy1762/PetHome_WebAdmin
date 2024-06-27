// Layouts
import ItemList from '~/pages/ItemPage/ItemList';
import PetList from '~/pages/PetPage/PetList';
import ItemDetail from '~/pages/ItemPage/ItemDetail';
import PetDetail from '~/pages/PetPage/PetDetail';
import ItemRpTicket from '~/pages/ItemPage/ItemRpTicket';
import PetRpTicket from '~/pages/PetPage/PetRpTicket';
import ServiceList from '~/pages/ServicePage/ServiceList';
import ServiceRpTicket from '~/pages/ServicePage/ServiceRpTicket';
import ServiceDetail from '~/pages/ServicePage/ServiceDetail';
import ShopList from '~/pages/ShopPage/ShopList';
import ShopRpTicket from '~/pages/ShopPage/ShopRpTicket';

const publicRoutes = [
    { path: '/', component: PetRpTicket },
    { path: '/item/list', component: ItemList },
    { path: '/items/:id', component: ItemDetail },
    { path: '/pet/list', component: PetList },
    { path: '/pets/:id', component: PetDetail },
    { path: '/item/report', component: ItemRpTicket },
    { path: '/pet/report', component: PetRpTicket },
    { path: '/service/list', component: ServiceList },
    { path: '/service/report', component: ServiceRpTicket },
    { path: '/services/:id', component: ServiceDetail },
    { path: '/shop/list', component: ShopList },
    { path: '/shop/report', component: ShopRpTicket },
];

export { publicRoutes };

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await userServices.getUser();
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                // Handle error
            }
            setLoading(false);
        };

        getUser();
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith('/user/shop')) {
            setSelectedKey('/user/shop');
        } else {
            setSelectedKey(location.pathname);
        }
    }, [location.pathname]);

    const items = [
        {
            key: '1',
            label: 'Customer Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Report Tickets</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">Customers List</a> },
            ],
        },
        {
            key: '2',
            label: 'Shop Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Request Tickets</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">List of Stores</a> },
            ],
        },
        {
            key: '3',
            label: 'Item Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Request Tickets</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">List of Items</a> },
            ],
        },
        {
            key: '4',
            label: 'Service Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Request Tickets</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">List of Services</a> },
            ],
        },
        {
            key: '5',
            label: 'Pet Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Request Tickets</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">List of Pets</a> },
            ],
        },
        {
            key: '6',
            label: 'System Management',
            children: [
                { key: '/user/account/profile', label: <a href="/user/account/profile">Payment</a> },
                { key: '/user/account/payment', label: <a href="/user/account/payment">Item, Service, Pet Type</a> },
            ],
        },
    ];



    return (
        <div className={cx('wrapper')}>
            <Menu
                style={{ width: 250 }}
                defaultOpenKeys={items.map((item) => item.key)}
                mode="inline"
                items={items}
                selectedKeys={[selectedKey]}
            />
        </div>
    );
}

export default Sidebar;

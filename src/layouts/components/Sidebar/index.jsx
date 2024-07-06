import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const items = [
        {
            key: '1',
            label: 'Pet Management',
            children: [
                { key: '/pet/request', label: <a href="/pet/request">Request Tickets</a> },
                { key: '/pet/list', label: <a href="/pet/list">List of Pets</a> },
            ],
        },
        {
            key: '2',
            label: 'Item Management',
            children: [
                { key: '/item/request', label: <a href="/item/request">Request Tickets</a> },
                { key: '/item/list', label: <a href="/item/list">List of Items</a> },
            ],
        },
        {
            key: '3',
            label: 'Service Management',
            children: [
                { key: '/service/request', label: <a href="/service/request">Request Tickets</a> },
                { key: '/service/list', label: <a href="/service/list">List of Services</a> },
            ],
        },
        {
            key: '4',
            label: 'Shop Management',
            children: [
                { key: '/shop/request', label: <a href="/shop/request">Request Tickets</a> },
                { key: '/shop/list', label: <a href="/shop/list">List of Shops</a> },
            ],
        },
        {
            key: '5',
            label: 'User Management',
            children: [
                { key: '/user/list', label: <a href="/user/list">List of Users</a> },
            ],
        },
        {
            key: '6',
            label: 'System Management',
            children: [
                { key: '/system/payment', label: <a href="/system/payment">Payment</a> },
                { key: '/system/type', label: <a href="/system/type">Item, Service, Pet Type</a> },
            ],
        },
        {
            key: '7',
            label: 'Notification Management',
            children: [
                { key: '/notification/send', label: <a href="/notification/send">Send Notification</a> },
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
                selectedKeys={[selectedKey === '/' ? '/pet/request' : selectedKey]}
            />
        </div>
    );
}

export default Sidebar;

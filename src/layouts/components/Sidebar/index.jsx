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
            label: 'Customer Management',
            children: [
                { key: '/customer/report', label: <a href="/customer/report">Report Tickets</a> },
                { key: '/customer/list', label: <a href="/customer/list">List of Customers</a> },
            ],
        },
        {
            key: '2',
            label: 'Shop Management',
            children: [
                { key: '/shop/report', label: <a href="/shop/report">Request Tickets</a> },
                { key: '/shop/list', label: <a href="/shop/list">List of Shops</a> },
            ],
        },
        {
            key: '3',
            label: 'Item Management',
            children: [
                { key: '/item/report', label: <a href="/item/report">Request Tickets</a> },
                { key: '/item/list', label: <a href="/item/list">List of Items</a> },
            ],
        },
        {
            key: '4',
            label: 'Service Management',
            children: [
                { key: '/service/report', label: <a href="/service/report">Request Tickets</a> },
                { key: '/service/list', label: <a href="/service/list">List of Services</a> },
            ],
        },
        {
            key: '5',
            label: 'Pet Management',
            children: [
                { key: '/pet/report', label: <a href="/pet/report">Request Tickets</a> },
                { key: '/pet/list', label: <a href="/pet/list">List of Pets</a> },
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

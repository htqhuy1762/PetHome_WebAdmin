import classNames from 'classnames/bind';
import styles from './ShopList.module.scss';
import * as shopServices from '~/services/shopServices';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import { Pagination, Table, Button, message } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function ShopList() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang
    const [total, setTotal] = useState(0);
    const [filterStatus, setFilterStatus] = useState(null);

    useEffect(() => {
        fetchData();
    }, [currentPage, filterStatus]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const start = (currentPage - 1) * limit;
            let params = { start, limit };

            // Xử lý khi có filterStatus
            if (filterStatus !== null) {
                if (Array.isArray(filterStatus)) {
                    params.status = filterStatus.map((status) => `'${status}'`).join(',');
                } else {
                    params.status = `'${filterStatus}'`;
                }
            } else {
                // Nếu không có filterStatus, mặc định lấy active và inactive
                params.status = "'active','inactive'";
            }

            const response = await shopServices.getShops(params);
            console.log(response);
            if (response.status === 200) {
                const rawData = response.data.shops;
                setData(rawData);
                setTotal(response.data.count);

                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]);
                    const dynamicColumns = keys.map((key) => {
                        let column = {
                            title: key.charAt(0).toUpperCase() + key.slice(1),
                            dataIndex: key,
                            key: key,
                        };

                        if (key === 'status') {
                            column.filters = [
                                { text: 'Active', value: 'active' },
                                { text: 'Inactive', value: 'inactive' },
                            ];
                            column.onFilter = (value, record) => record[key] === value;
                        }

                        if (key === 'created_at') {
                            column.render = (text) => dayjs(text).format('HH:mm:ss DD-MM-YYYY');
                        }

                        if (key === 'logo' || key === 'back_photo' || key === 'front_photo') {
                            column.render = (text) => (
                                <a href={text} target="_blank" rel="noopener noreferrer">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </a>
                            );
                        }

                        return {
                            ...column,
                        };
                    });

                    // Thêm cột action
                    dynamicColumns.push({
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <>
                                <Button
                                    className={cx('action-button', {
                                        active: record.status === 'inactive',
                                        inactive: record.status === 'active',
                                    })}
                                    onClick={() => handleUpdateStatus(record)}
                                    type="primary"
                                >
                                    {record.status === 'active' ? 'Inactive' : 'Active'}
                                </Button>
                            </>
                        ),
                    });

                    setColumns(dynamicColumns);
                }
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (record) => {
        const newStatus = record.status === 'active' ? 'inactive' : 'active';
        try {
            await shopServices.updateStatusShop(record.id_shop, newStatus); // Giả sử có một API để cập nhật trạng thái
            message.success('Cập nhật trạng thái thành công');
            fetchData(); // Gọi lại fetchData để cập nhật bảng
        } catch (error) {
            message.error('Cập nhật trạng thái thất bại');
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    console.log('data:', data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false} // Để sử dụng pagination của Table của Ant Design, cài đặt tùy chỉnh bên dưới
                    rowKey="id_shop"
                    scroll={{ x: 'max-content' }}
                    onChange={(pagination, filters) => {
                        if (filters.status) {
                            setFilterStatus(filters.status[0]);
                        } else {
                            setFilterStatus(null);
                        }
                    }}
                    rowClassName={() => cx('pointer')}
                />
                <div className={cx('pagination-container')}>
                    <Pagination
                        showSizeChanger={false}
                        className={cx('pagination')}
                        size="middle"
                        defaultPageSize={limit}
                        defaultCurrent={1}
                        total={total}
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShopList;

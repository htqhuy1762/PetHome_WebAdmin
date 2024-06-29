import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import * as paymentServices from '~/services/paymentServices';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import { Pagination, Table, Button, message } from 'antd';

const cx = classNames.bind(styles);

function Payment() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await paymentServices.getPayments();

            if (response.status === 200) {
                const rawData = response.data;
                setData(rawData);

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
            await paymentServices.updateStatusPayment(record.id_method, newStatus); // Giả sử có một API để cập nhật trạng thái
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false} // Để sử dụng pagination của Table của Ant Design, cài đặt tùy chỉnh bên dưới
                    rowKey="id_method"
                    scroll={{ x: 'max-content' }}
                    rowClassName={() => cx('pointer')}
                />
                <div className={cx('pagination-container')}>
                    <Pagination
                        showSizeChanger={false}
                        className={cx('pagination')}
                        size="middle"
                        defaultPageSize={limit}
                        defaultCurrent={1}
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;

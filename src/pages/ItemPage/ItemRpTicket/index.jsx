import classNames from 'classnames/bind';
import styles from './ItemRpTicket.module.scss';
import * as itemServices from '~/services/itemServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import { Pagination, Table } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function ItemRpTicket() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Khi currentPage thay đổi, gọi fetchData lại

    const fetchData = async () => {
        setLoading(true);
        try {
            const start = (currentPage - 1) * limit;
            const params = { start, limit, status: "'requested'" }; // Chỉ lấy các mục có trạng thái "requested"
            const response = await itemServices.getItems(params);
            if (response.status === 200) {
                const rawData = response.data.items;
                setData(rawData);
                setTotal(response.data.count);

                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]).filter(
                        (key) => key !== 'instock' && key !== 'picture' && key !== 'id_shop'
                    );
                    const dynamicColumns = keys.map((key) => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        dataIndex: key,
                        key: key,
                        render: key === 'created_at' ? (text) => dayjs(text).format('HH:mm:ss DD-MM-YYYY') : undefined,
                    }));
                    setColumns(dynamicColumns);
                }
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const goToItemDetail = (id) => {
        navigate(`/items/${id}`);
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
                    pagination={false}
                    rowKey="id_item"
                    onRow={(record) => ({
                        onClick: () => goToItemDetail(record.id_item),
                    })}
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
                        total={total}
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ItemRpTicket;

import classNames from 'classnames/bind';
import styles from './PetList.module.scss';
import * as petServices from '~/services/petServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import { Pagination, Table } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function PetList() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
                    params.status = filterStatus.map(status => `'${status}'`).join(',');
                } else {
                    params.status = `'${filterStatus}'`;
                }
            } else {
                // Nếu không có filterStatus, mặc định lấy active và inactive
                params.status = "'active','inactive'";
            }
    
            const response = await petServices.getPets(params);
            console.log(response);
            if (response.status === 200) {
                const rawData = response.data.pets;
                setData(rawData);
                setTotal(response.data.count);
    
                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]).filter(
                        (key) => key !== 'instock' && key !== 'picture' && key !== 'id_shop',
                    );
                    const dynamicColumns = keys.map((key) => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        dataIndex: key,
                        key: key,
                        filters:
                            key === 'status'
                                ? [
                                      { text: 'Active', value: 'active' },
                                      { text: 'Inactive', value: 'inactive' },
                                  ]
                                : null,
                        onFilter: key === 'status' ? (value, record) => record[key] === value : null,
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

    const goToPetDetail = (id) => {
        navigate(`/pets/${id}`);
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
                    rowKey="id_pet"
                    onRow={(record) => ({
                        onClick: () => goToPetDetail(record.id_pet),
                    })}
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

export default PetList;

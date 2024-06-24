import classNames from 'classnames/bind';
import styles from './PetList.module.scss';
import * as petServices from '~/services/petServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import { Pagination, Table } from 'antd';

const cx = classNames.bind(styles);

function PetList() {
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
            const response = await petServices.getPets({ start, limit });
            if (response.status === 200) {
                const rawData = response.data.data;
                setData(rawData);
                setTotal(response.data.count);
                
                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]);
                    const dynamicColumns = keys.map((key) => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        dataIndex: key,
                        key: key,
                    }));
                    setColumns(dynamicColumns);
                }
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
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

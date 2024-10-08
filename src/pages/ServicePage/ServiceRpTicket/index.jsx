import classNames from 'classnames/bind';
import styles from './ServiceRpTicket.module.scss';
import * as servicePetServices from '~/services/servicePetServices';
import { useEffect, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import { Pagination, Table, Space, Button, Input, Tooltip } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function ServiceRpTicket() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang
    const [total, setTotal] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchText, searchedColumn]); // Khi currentPage thay đổi, gọi fetchData lại

    const fetchData = async () => {
        setLoading(true);
        try {
            const start = (currentPage - 1) * limit;
            const params = { start, limit, status: "'requested'" }; // Chỉ lấy các mục có trạng thái "requested"
            const response = await servicePetServices.getServices(params, { search: searchText || '' });
            if (response.status === 200) {
                const rawData = response.data.services;
                setData(rawData);
                setTotal(response.data.count);

                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]).filter(
                        (key) =>
                            key !== 'picture' &&
                            key !== 'id_shop' &&
                            key !== 'id_service_type_detail' &&
                            key !== 'count',
                    );
                    const dynamicColumns = keys.map((key) => {
                        let column = {
                            title: key.charAt(0).toUpperCase() + key.slice(1),
                            dataIndex: key,
                            key: key,
                        };

                        if (key === 'id_service') {
                            column.render = (text) => (
                                <Tooltip title={text}>{text.length > 9 ? `${text.slice(0, 9)}...` : text}</Tooltip>
                            );
                        }
                        if (key === 'id_service' || key === 'name' || key === 'shop_name') {
                            column = { ...column, ...getColumnSearchProps(key) };
                        }
                        if (key === 'created_at') {
                            column.render = (text) => dayjs(text).format('HH:mm:ss DD-MM-YYYY');
                        }

                        return column;
                    });
                    setColumns(dynamicColumns);
                }
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        if (dataIndex === 'name' || dataIndex === 'id_service') {
            // Xây dựng chuỗi tìm kiếm theo name
            const query = `service.${dataIndex} like '%${selectedKeys[0]}%'`;
            setSearchText(query);
        } else if (dataIndex === 'shop_name') {
            // Xây dựng chuỗi tìm kiếm theo shop_name
            const query = `shop.name like '%${selectedKeys[0]}%'`;
            setSearchText(query);
        }
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
    };

    const goToServiceDetail = (id) => {
        navigate(`/services/${id}`);
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
                    pagination={false}
                    rowKey="id_service"
                    onRow={(record) => ({
                        onClick: () => goToServiceDetail(record.id_service),
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

export default ServiceRpTicket;

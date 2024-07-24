import classNames from 'classnames/bind';
import styles from './BillList.module.scss';
import * as billServices from '~/services/billServices';
import { useEffect, useState, useRef } from 'react';
import Loading from '~/components/Loading';
import { Pagination, Table, Input, Button, Space, Tooltip, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function BillList() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang
    const [total, setTotal] = useState(0);
    const [filterStatus, setFilterStatus] = useState(null); // Thêm trạng thái filter
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        getBills();
    }, [currentPage, filterStatus, searchText, searchedColumn]); // Khi currentPage thay đổi, gọi fetchData lại

    const getBills = async () => {
        setLoading(true);
        try {
            const response = await billServices.getBills(
                {
                    start: (currentPage - 1) * limit,
                    limit: limit,
                    admin_paid: false,
                },
                { search: searchText || '' },
            );
            if (response.status === 200) {
                const rawData = response.data.bills;
                setData(rawData);
                setTotal(response.data.count);

                // Tạo các cột động từ dữ liệu
                if (rawData.length > 0) {
                    const keys = Object.keys(rawData[0]).filter(
                        (key) =>
                            key !== 'address' &&
                            key !== 'area' &&
                            key !== 'price' &&
                            key !== 'quantity' &&
                            key !== 'status' &&
                            key !== 'admin_paid' &&
                            key !== 'count' &&
                            key !== 'id_method' &&
                            key !== 'payment_status' &&
                            key !== 'id_shop',
                    );
                    const dynamicColumns = keys.map((key) => {
                        let column = {
                            title: key.charAt(0).toUpperCase() + key.slice(1),
                            dataIndex: key,
                            key: key,
                        };

                        if (key === 'id_bill' || key === 'id_shop' || key === 'id_user') {
                            column.render = (text) => (
                                <Tooltip title={text}>{text.length > 9 ? `${text.slice(0, 9)}...` : text}</Tooltip>
                            );
                        }
                        if (key === 'shop_name') {
                            column = { ...column, ...getColumnSearchProps(key) };
                        }
                        if (key === 'status') {
                            column.filters = [
                                { text: 'Active', value: 'active' },
                                { text: 'Inactive', value: 'inactive' },
                            ];
                            column.onFilter = (value, record) => record.status === value;
                        }
                        if (key === 'created_at') {
                            column.render = (text) => dayjs(text).format('HH:mm:ss DD-MM-YYYY');
                        }

                        return column;
                    });

                    // Thêm cột action
                    dynamicColumns.push({
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                            <Button type="primary" onClick={() => showConfirm(record.id_bill)}>
                                Đã thanh toán
                            </Button>
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

    const showConfirm = (id_bill) => {
        Modal.confirm({
            title: 'Xác nhận thanh toán',
            content: 'Bạn chắc chắn muốn xác nhận rằng đơn hàng này đã thanh toán?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: () => processBills(id_bill),
        });
    };

    const processBills = async (id_bill) => {
        try {
            const response = await billServices.updateAdminPaidBill(id_bill, true);
            console.log(response);
            if (response.status === 200) {
                getBills();
                message.success('Thành công');
            } else {
                message.error('Thất bại');
            }
        } catch (error) {
            console.error('Failed to update bill:', error);
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
        if (dataIndex === 'shop_name') {
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
                    rowKey="id_bill"
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

export default BillList;

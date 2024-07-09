import classNames from 'classnames/bind';
import styles from './UserList.module.scss';
import * as userServices from '~/services/userServices';
import { useEffect, useState, useRef } from 'react';
import Loading from '~/components/Loading';
import { Pagination, Table, Button, message, Input, Space, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const cx = classNames.bind(styles);

function UserList() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 15; // Số lượng mục trên mỗi trang
    const [total, setTotal] = useState(0);
    const [filterStatus, setFilterStatus] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notificationIdUser, setNotificationIdUser] = useState(null);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationUserName, setNotificationUserName] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, filterStatus, searchText, searchedColumn]);

    const showNotificationModal = (idUser, userName) => {
        setNotificationIdUser(idUser);
        setNotificationUserName(userName);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNotificationTitle('');
        setNotificationMessage('');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const start = (currentPage - 1) * limit;
            let params = { start, limit };

            // Xử lý khi có filterStatus
            if (filterStatus !== null) {
                params.status = `'${filterStatus}'`;
            } else {
                // Nếu không có filterStatus, mặc định lấy active và inactive
                params.status = "'active','inactive'";
            }

            const response = await userServices.getUsers(params, { search: searchText || '' });
            if (response.status === 200) {
                const rawData = response.data.users;
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

                        if (key === 'id_user' || key === 'name') {
                            column = { ...column, ...getColumnSearchProps(key) };
                        }

                        if (key === 'day_of_birth') {
                            column.render = (text) => dayjs(text).format('DD-MM-YYYY');
                        }

                        if (key === 'avatar') {
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

                                <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => showNotificationModal(record.id_user, record.name)}
                                    type="primary"
                                >
                                    Gửi thông báo
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
            await userServices.updateStatusUser(record.id_user, newStatus);
            message.success('Cập nhật trạng thái thành công');
            fetchData(); // Gọi lại fetchData để cập nhật bảng
        } catch (error) {
            message.error('Cập nhật trạng thái thất bại');
            console.error('Error updating status:', error);
        }
    };

    const handleSendNotification = async () => {
        try {
            const formData = new FormData();
            formData.append('id_user', notificationIdUser);
            formData.append('title', notificationTitle);
            formData.append('message', notificationMessage);

            const response = await userServices.sendNotification(formData);
            
            if (response.status === 200) {
                message.success('Gửi thông báo thành công');
                handleCancel();
            }
        } catch (error) {
            message.error('Gửi thông báo thất bại');
            console.error('Error sending notification:', error);
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
        if (dataIndex === 'name' || dataIndex === 'id_user') {
            // Xây dựng chuỗi tìm kiếm theo name
            const query = `user_client.${dataIndex} like '%${selectedKeys[0]}%'`;
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
                    pagination={false} // Để sử dụng pagination của Table của Ant Design, cài đặt tùy chỉnh bên dưới
                    rowKey="id_user"
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

            <Modal
                title={`Gửi thông báo đến: ${notificationUserName}`}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSendNotification}>
                        Gửi
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Tiêu đề"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    style={{ marginBottom: 8 }}
                />
                <Input.TextArea
                    placeholder="Nội dung"
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    rows={4}
                />
            </Modal>
        </div>
    );
}

export default UserList;

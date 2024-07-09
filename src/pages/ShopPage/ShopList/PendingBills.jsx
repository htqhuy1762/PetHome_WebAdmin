import { Table, Button, Modal, message, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import * as billServices from '~/services/billServices';
import Loading from '~/components/Loading';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PropTypes from 'prop-types';

dayjs.extend(utc);

function PendingBills({ shopId, isProcessed, setIsProcessed }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getBills();
    }, [currentPage, shopId]);

    const getBills = async () => {
        setLoading(true);
        const response = await billServices.getBillsByShop(shopId, {
            start: (currentPage - 1) * limit,
            limit: limit,
            admin_paid: false,
        });

        if (response.status === 200) {
            const bills = response.data.bills
            setData(bills);
            setTotal(response.data.count);
            if (bills.length > 0) {
                const keys = Object.keys(bills[0]).filter(
                    (key) => key !== 'area' && key !== 'address' && key !== 'id_shop',
                );
                const dynamicColumns = keys.map((key) => {
                    let column = {
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        dataIndex: key,
                        key: key,
                    };
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
            setLoading(false);
        } else {
            setLoading(false);
            console.error('Failed to fetch bills:', response.statusText);
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
                setIsProcessed(!isProcessed);
                message.success('Thành công');
            } else {
                message.error('Thất bại');
            }
        } catch (error) {
            console.error('Failed to update bill:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id_bill"
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
            <Pagination
                style={{ marginTop: '10px', display: 'flex', justifyContent: 'center'}}
                current={currentPage}
                pageSize={limit}
                total={total}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

PendingBills.propTypes = {
    shopId: PropTypes.string,
    isProcessed: PropTypes.bool,
    setIsProcessed: PropTypes.func,
};

export default PendingBills;

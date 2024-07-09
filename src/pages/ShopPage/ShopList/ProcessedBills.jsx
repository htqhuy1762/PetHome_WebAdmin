import { Table, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import * as billServices from '~/services/billServices';
import Loading from '~/components/Loading';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PropTypes from 'prop-types';

dayjs.extend(utc);

function ProcessedBills({ shopId, isProcessed }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [total, setTotal] = useState(0);

    const getBills = async () => {
        setLoading(true);
        const response = await billServices.getBillsByShop(shopId, {
            start: (currentPage - 1) * limit,
            limit: limit,
            admin_paid: true,
        });

        if (response.status === 200) {
            const bills = response.data.bills;
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
                setColumns(dynamicColumns);
            }
            setLoading(false);
        } else {
            setLoading(false);
            console.error('Failed to fetch bills:', response.statusText);
        }
    };

    useEffect(() => {
        getBills();
    }, [currentPage, shopId, isProcessed]);

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
                style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
                current={currentPage}
                pageSize={limit}
                total={total}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

ProcessedBills.propTypes = {
    shopId: PropTypes.string,
    isProcessed: PropTypes.bool,
};

export default ProcessedBills;

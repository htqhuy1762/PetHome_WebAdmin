import { Spin } from 'antd';

function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" />
            <div style={{ fontSize: '2.8rem', marginLeft: '20px', color: '#1677ff' }}>Loading...</div>
        </div>
    );
}

export default Loading;

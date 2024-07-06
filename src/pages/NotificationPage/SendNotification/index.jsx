import classNames from 'classnames/bind';
import styles from './SendNotification.module.scss';

const cx = classNames.bind(styles);

function SendNotification() {
    return <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <h1 className={cx('title')}>Send Notification</h1>
        </div>
        
    </div>;
}

export default SendNotification;

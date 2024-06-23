import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import logotitle from '~/assets/images/logo-title.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo_container')}>
                <img className={cx('logo')} src={logo} alt="logo" />
                <img className={cx('logo_title')} src={logotitle} alt="logotitle" />
            </div>
            <div className={cx('title')}>
                <p style={{ color: '#293651', fontSize: '4rem', fontWeight: 700 }}>Trang quản lý hệ thống</p>
            </div>
        </div>
    );
}

export default Header;

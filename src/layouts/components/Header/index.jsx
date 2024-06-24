import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import logotitle from '~/assets/images/logo-title.png';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '~/components/AuthProvider/index.jsx';
import { useNavigate } from 'react-router-dom';
import * as authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function Header() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
        await authServices.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiredAt');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const items = [
        {
            key: '1',
            label: (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    Đăng xuất
                </a>
            ),
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo_container')}>
                <img className={cx('logo')} src={logo} alt="logo" />
                <img className={cx('logo_title')} src={logotitle} alt="logotitle" />
            </div>
            <div className={cx('title')}>
                <p style={{ color: '#293651', fontSize: '4rem', fontWeight: 700 }}>Trang quản lý hệ thống</p>
            </div>
            <div className={cx('right-menu')}>
                <div className={cx('user')}>
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        <a
                            style={{
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                maxWidth: '145px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Avatar style={{ marginRight: '5px' }} size={39} icon={<UserOutlined />} />
                            <span
                                style={{
                                    maxWidth: '105px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Admin
                            </span>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;

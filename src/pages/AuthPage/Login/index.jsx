import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.png';
import logotitle from '~/assets/images/logo-title.png';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as authServices from '~/services/authServices';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/components/AuthProvider/index.jsx';
import { useEffect, useContext, useRef } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const formRef = useRef(null);

    const onFinish = async (data) => {
        try {
            const response = await authServices.login(data);

            console.log(response);

            if (response && response.status === 200) {
                const accessToken = response.data.accessToken;
                const expiredAt = response.data.expiredAt;
                const refreshToken = response.data.refreshToken;

                // Save accessToken to localStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expiredAt', expiredAt);
                localStorage.setItem('refreshToken', refreshToken);

                setIsLoggedIn(true);

                navigate('/');
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Vui lòng kiểm tra lại email hoặc mật khẩu!',
                });
                return;
            }
        } catch (error) {
            console.log('login failed:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); // Đường dẫn đến trang chủ của bạn
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form_container')}>
                <Form
                    className={cx('form')}
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    ref={formRef}
                >
                    <div className={cx('logo_container')}>
                        <img className={cx('logo')} src={logo} alt="logo" />
                        <img className={cx('logo_title')} src={logotitle} alt="logotitle" />
                    </div>
                    <h1 style={{ textAlign: 'center' }}>Đăng nhập Admin</h1>
                    <Form.Item
                        label={<label style={{ fontSize: '1.6rem' }}>Tài khoản</label>}
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                    >
                        <Input size="large" prefix={<UserOutlined />} placeholder="Email" autoComplete="username" />
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ fontSize: '1.6rem' }}>Mật khẩu</label>}
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            style={{ backgroundColor: 'var(--button-next-color)', width: '100%', fontSize: '1.7rem' }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;

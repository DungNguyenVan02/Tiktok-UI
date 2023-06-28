import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';
import {
    FacebookIcon,
    QrIcon,
    UserIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    TalkIcon,
    AppleIcon,
    InstagramIcon,
} from '../Icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '../ModalProvider';
const cx = classNames.bind(styles);

const LOGIN_REGISTER = [
    {
        type: 'login',
        title: 'Log in to TikTok',
        data: [
            {
                icon: <QrIcon />,
                title: 'Use QR code',
            },
            {
                icon: <UserIcon />,
                title: 'Use phone / email / username',
            },
            {
                icon: <FacebookIcon width="2rem" height="2rem" />,
                title: 'Continue with Facebook',
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
            },
            {
                icon: <TwitterIcon width="2rem" height="2rem" />,
                title: 'Continue with Twitter',
            },
            {
                icon: <LineIcon />,
                title: 'Continue with LINE',
            },
            {
                icon: <TalkIcon />,
                title: 'Continue with KakaoTalk',
            },
            {
                icon: <AppleIcon />,
                title: 'Continue with Apple',
            },
            {
                icon: <InstagramIcon />,
                title: 'Continue with Instagram',
            },
        ],
    },
    {
        type: 'register',
        title: 'Sign up for TikTok',
        data: [
            {
                icon: <UserIcon />,
                title: 'Use phone or email',
            },
            {
                icon: <FacebookIcon width="2rem" height="2rem" />,
                title: 'Continue with Facebook',
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
            },
            {
                icon: <TwitterIcon width="2rem" height="2rem" />,
                title: 'Continue with Twitter',
            },
            {
                icon: <LineIcon />,
                title: 'Continue with LINE',
            },
            {
                icon: <TalkIcon />,
                title: 'Continue with KakaoTalk',
            },
        ],
    },
];

function ModalLogin() {
    const [stateForm, setStateForm] = useState('login');
    const [form, setForm] = useState([]);

    const loginContext = useContext(ModalContext);

    useEffect(() => {
        const dataForm = LOGIN_REGISTER.find((form) => form.type === stateForm);
        setForm(dataForm);
    }, [stateForm]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-close')} onClick={loginContext.closeModal}>
                <FontAwesomeIcon icon={faXmark} className={cx('btn-close')} />
            </div>
            <ul className={cx('option-list')}>
                <h3 className={cx('title')}>{form?.title}</h3>
                {form?.data?.map((data, index) => (
                    <li className={cx('option-item')} key={index}>
                        <button className={cx('btn-item')}>
                            <span className={cx('icon')}>{data.icon}</span>
                            <span className={cx('content')}>{data.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className={cx('footer')}>
                {stateForm === 'login' ? (
                    <>
                        Don't have an account? <p onClick={() => setStateForm('register')}> Sign up</p>
                    </>
                ) : (
                    <>
                        Already have an account? <p onClick={() => setStateForm('login')}> Log in</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalLogin;

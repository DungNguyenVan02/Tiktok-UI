import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import ModalLogin from '~/components/ModalLogin';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const LoginContext = useContext(ModalContext);
    const { open } = LoginContext;
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {open && (
                <div className={cx('modal-form')}>
                    <ModalLogin />
                </div>
            )}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

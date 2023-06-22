import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/Image';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function AccountItem({ data }) {
    const handlePreview = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('preview')}>
                    <div className={cx('preview-header')}>
                        <Link to={`/@${data?.nickname}`}>
                            <Image className={cx('preview-image')} src={data?.avatar} />
                        </Link>
                        <Button className={cx('preview-follow')} primary>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('preview-body')}>
                        <h4 className={cx('preview-nickname')}>
                            <strong>{data?.first_name + data?.last_name}</strong>
                            <FontAwesomeIcon className={cx('preview-check')} icon={faCheckCircle} />
                        </h4>
                        <p className={cx('preview-name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                        <p className={cx('preview-analytics')}>
                            <strong className={cx('preview-value')}>{data?.followers_count} </strong>
                            <span className={cx('preview-label')}>Followers</span>
                            <strong className={cx('preview-value')}>{data?.likes_count} </strong>
                            <span className={cx('preview-label')}>Likes</span>
                        </p>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy placement="bottom" interactive delay={[800, 0]} offset={[-20, 0]} render={handlePreview}>
                <Link to={`/@${data?.nickname}`}>
                    <div className={cx('account-item')}>
                        <Image className={cx('avatar')} src={data?.avatar} alt={data?.first_name + data.last_name} />
                        <div className={cx('item-info')}>
                            <h4 className={cx('nickname')}>
                                <strong>{data?.nickname}</strong>
                                {data?.tick ? <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> : ''}
                            </h4>
                            <p className={cx('name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                        </div>
                    </div>
                </Link>
            </HeadlessTippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;

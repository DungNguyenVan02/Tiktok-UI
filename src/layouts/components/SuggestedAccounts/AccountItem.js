import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/Image';
import Button from '~/components/Button/Button';
const cx = classNames.bind(styles);
function AccountItem() {
    const handlePreview = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('preview')}>
                    <div className={cx('preview-header')}>
                        <Image
                            className={cx('preview-image')}
                            src="https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/309260861_193992216346350_1445534576643188259_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XHLAFzIn1uYAX_s2WR9&_nc_ht=scontent-hkt1-2.xx&oh=00_AfAxu1a7onM-P4rX1uA0ESyk3jW0kSfse5FsBBqv8TyFQA&oe=6493D217"
                        />
                        <Button className={cx('preview-follow')} primary>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('preview-body')}>
                        <h4 className={cx('preview-nickname')}>
                            <strong>dung_n_v</strong>
                            <FontAwesomeIcon className={cx('preview-check')} icon={faCheckCircle} />
                        </h4>
                        <p className={cx('preview-name')}>Nguyễn Văn Dũng</p>
                        <p className={cx('preview-analytics')}>
                            <strong className={cx('preview-value')}>9.2M </strong>
                            <span className={cx('preview-label')}>Followers</span>
                            <strong className={cx('preview-value')}>9.2M </strong>
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
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/309260861_193992216346350_1445534576643188259_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XHLAFzIn1uYAX_s2WR9&_nc_ht=scontent-hkt1-2.xx&oh=00_AfAxu1a7onM-P4rX1uA0ESyk3jW0kSfse5FsBBqv8TyFQA&oe=6493D217"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>dung_n_v</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <p className={cx('name')}>Nguyễn Văn Dũng</p>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default AccountItem;

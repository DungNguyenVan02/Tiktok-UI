import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './VideoPreviewInfo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function VideoPreviewInfo({ attrs, data }) {
    return (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('preview')}>
                    <div className={cx('preview-header')}>
                        <Image className={cx('preview-image')} src={data?.user.avatar} />
                        <Button className={cx('preview-follow')} primary>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('preview-body')}>
                        <h4 className={cx('preview-nickname')}>
                            <strong>{data?.user.first_name + data?.user.last_name}</strong>
                            {data?.user.tick && (
                                <FontAwesomeIcon className={cx('preview-check')} icon={faCheckCircle} />
                            )}
                        </h4>
                        <p className={cx('preview-name')}>{`${data?.user.first_name} ${data?.user.last_name}`}</p>
                        <p className={cx('preview-analytics')}>
                            <strong className={cx('preview-value')}>{data?.user.followers_count} </strong>
                            <span className={cx('preview-label')}>Followers</span>
                            <strong className={cx('preview-value')}>{data?.user.likes_count} </strong>
                            <span className={cx('preview-label')}>Likes</span>
                        </p>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    );
}

VideoPreviewInfo.propTypes = {
    attrs: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default VideoPreviewInfo;

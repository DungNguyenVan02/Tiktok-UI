import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { CommentIcon, HeartIcon, ShareIcon } from '../Icons';
const cx = classNames.bind(styles);

function VideoAction({ data }) {
    return (
        <div className={cx('action')}>
            <div className={cx('action-group')}>
                <span className={cx('wrapper-icon')}>
                    <HeartIcon />
                </span>
                <strong>{data?.likes_count}</strong>
            </div>
            <div className={cx('action-group')}>
                <span className={cx('wrapper-icon')}>
                    <CommentIcon />
                </span>
                <strong>{data?.comments_count}</strong>
            </div>
            <div className={cx('action-group')}>
                <span className={cx('wrapper-icon')}>
                    <ShareIcon />
                </span>
                <strong>{data?.shares_count}</strong>
            </div>
        </div>
    );
}

VideoAction.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoAction;

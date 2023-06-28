import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';
import { CommentIcon, HeartIcon, ShareIcon } from '../Icons';
import ShareVideo from './ShareVideo';
const cx = classNames.bind(styles);

function VideoAction({ data }) {
    return (
        <div className={cx('action')}>
            <div className={cx('action-group')}>
                <button className={cx('wrapper-icon')}>
                    <HeartIcon />
                </button>
                <strong>{data?.likes_count}</strong>
            </div>
            <div className={cx('action-group')}>
                <button className={cx('wrapper-icon')}>
                    <CommentIcon />
                </button>
                <strong>{data?.comments_count}</strong>
            </div>
            <div className={cx('action-group')}>
                <ShareVideo x={-40} y={10}>
                    <button className={cx('wrapper-icon')}>
                        <ShareIcon />
                    </button>
                </ShareVideo>
                <strong>{data?.shares_count}</strong>
            </div>
        </div>
    );
}

VideoAction.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoAction;

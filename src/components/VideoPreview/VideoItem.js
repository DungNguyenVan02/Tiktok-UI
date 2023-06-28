import PropTypes from 'prop-types';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import { PlayIcon } from '../Icons';
import Image from '~/Image';

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const videoRef = useRef();

    return (
        <div className={cx('video-item')}>
            <div
                className={cx('video')}
                onMouseEnter={() => videoRef.current.play()}
                onMouseLeave={() => videoRef.current.pause()}
            >
                <div className={cx('video-img')}>
                    <Image className={cx('video-img-link')} src={data.thumb_url} />
                </div>
                <video className={cx('video-link')} src={data.file_url} ref={videoRef} muted loop />
                <div className={cx('video-action')}>
                    <PlayIcon />
                    <strong>{data.views_count}</strong>
                </div>
            </div>
            <h3 className={cx('description')}>{data.description}</h3>
        </div>
    );
}

VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoItem;

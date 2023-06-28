import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

function VideoPreview({ videos }) {
    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => {
                return <VideoItem key={index} data={video} />;
            })}
        </div>
    );
}

VideoPreview.propTypes = {
    videos: PropTypes.array.isRequired,
};

export default VideoPreview;

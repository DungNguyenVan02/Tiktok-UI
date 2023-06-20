import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import Image from '~/Image';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { PlayIcon, PauseIcon, FlagIcon, MusicIcon, VolumeIcon, MuteIcon } from '../Icons';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import routes from '~/config';
import VideoAction from './VideoAction';
import VideoPreviewInfo from './VideoPreviewInfo';
const cx = classNames.bind(styles);
function Video({ data }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVolume, setIsVolume] = useState(false);
    const videoRef = useRef();

    const handleTogglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
            videoRef.current.pause();
        } else {
            setIsPlaying(true);
            videoRef.current.play();
        }
    };

    const handleAdjustVolume = (e) => {
        videoRef.current.volume = e.target.value / 100;
    };

    const handlePreview = (attrs) => <VideoPreviewInfo attrs={attrs} data={data} />;
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('image')} src={data?.user.avatar} alt={data?.user.avatar} />
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div>
                        {/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
                        <div>
                            <HeadlessTippy
                                placement="bottom"
                                interactive
                                delay={[800, 0]}
                                offset={[-40, 40]}
                                render={handlePreview}
                            >
                                <span className={cx('info')}>
                                    <h3 className={cx('nickname')}>{data?.user.nickname}</h3>
                                    {data?.user.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                                    <p className={cx('name')}>{`${data?.user.first_name} ${data?.user.last_name}`}</p>
                                </span>
                            </HeadlessTippy>
                        </div>
                        <span className={cx('tag')}>
                            <p className={cx('hashtag')}>#Food</p>
                            <p className={cx('description')}>{data?.description}</p>
                        </span>
                        <span className={cx('music')}>
                            {data?.music && <MusicIcon className={cx('music-icon')} />}
                            {data?.music}
                        </span>
                    </div>
                    <div>
                        <Button small outline>
                            Follow
                        </Button>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('video-wrapper')} href="/">
                        <Link to={routes.home}>
                            <video className={cx('video')} ref={videoRef} src={data?.file_url} />
                        </Link>
                        <div className={cx('control')}>
                            <div className={cx('control-play')} onClick={handleTogglePlay}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className={cx('control-sound')} onClick={() => setIsVolume(!isVolume)}>
                                <div className={cx('sound-level')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        orient="vertical"
                                        onChange={handleAdjustVolume}
                                    />
                                </div>
                                {isVolume ? <VolumeIcon /> : <MuteIcon />}
                            </div>
                            <div className={cx('progress')}>
                                <div className={cx('progress-area')}>
                                    <div className={cx('progress-bar')}></div>
                                </div>
                                <div className={cx('progress-time')}>
                                    <span className={cx('current-time')}>30</span>/
                                    <span className={cx('duration-time')}>30</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('report')}>
                            <FlagIcon />
                            <span>Report</span>
                        </div>
                    </div>
                    <VideoAction data={data} />
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Video;

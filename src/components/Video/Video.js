import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
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
function Video({ data, volume, adjustVolume, toggleMuted }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef();

    useEffect(() => {
        elementInViewport();
    }, []);

    useEffect(() => {
        videoRef.current.volume = volume;

        window.addEventListener('scroll', elementInViewport);
        return () => window.removeEventListener('scroll', elementInViewport);
    });

    const handleTimeVideo = (e) => {
        const currentTime = e.target.currentTime;
        const durationTime = e.target.duration;
        let widthProgressBarUpdate = (currentTime / durationTime) * 100;

        let totalMin = Math.floor(durationTime / 60);
        let totalSec = Math.floor(durationTime % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }

        setCurrentTime(`${currentMin}:${currentSec}`);
        setDuration(`${totalMin}:${totalSec}`);
        setProgressBarWidth(widthProgressBarUpdate);
    };

    const playVideo = () => {
        if (isPlaying === false) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseVideo = () => {
        if (isPlaying === true) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTogglePlay = () => {
        isPlaying ? pauseVideo() : playVideo();
    };

    function elementInViewport() {
        var bounding = videoRef.current.getBoundingClientRect();
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            playVideo();
        } else {
            pauseVideo();
        }
    }

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
                            <video
                                muted={volume === 0}
                                className={cx('video')}
                                ref={videoRef}
                                src={data?.file_url}
                                onTimeUpdate={handleTimeVideo}
                                loop
                            />
                        </Link>
                        <div className={cx('control')}>
                            <div className={cx('control-play')} onClick={handleTogglePlay}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className={cx('control-sound')}>
                                <div className={cx('sound-level')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        orient="vertical"
                                        onChange={adjustVolume}
                                        value={volume * 100}
                                    />
                                </div>
                                <div onClick={toggleMuted}>{volume === 0 ? <MuteIcon /> : <VolumeIcon />}</div>
                            </div>
                            <div className={cx('progress')}>
                                <div className={cx('progress-area')}>
                                    <div className={cx('progress-bar')} style={{ width: `${progressBarWidth}%` }}></div>
                                </div>
                                <div className={cx('progress-time')}>
                                    <span className={cx('current-time')}>{currentTime}</span>
                                    {'/'}
                                    <span className={cx('duration-time')}>{duration}</span>
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
    volume: PropTypes.number.isRequired,
    adjustVolume: PropTypes.func.isRequired,
    toggleMuted: PropTypes.func.isRequired,
};

export default Video;

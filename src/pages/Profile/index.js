import { useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames/bind';

import Image from '~/Image';
import Button from '~/components/Button/Button';
import VideoPreview from '~/components/VideoPreview/VideoPreview';
import ShareVideo from '~/components/Video/ShareVideo';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';
import { ArrowIcon, BlockIcon, FlagIcon, MenuIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    const data = location.state;

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/users/@${data.nickname}`)
            .then((response) => response.json())
            .then((result) => setVideos(result.data.videos));
    }, [data.nickname]);

    const renderMenu = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('wrapper-menu')}>
                <ul className={cx('menu-list')}>
                    <li className={cx('menu-item')}>
                        <span>
                            <FlagIcon />
                        </span>
                        <span>Report</span>
                    </li>
                    <li className={cx('menu-item')}>
                        <span>
                            <BlockIcon />
                        </span>
                        <span>Block</span>
                    </li>
                </ul>
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('profile')}>
                    <Image src={data?.avatar} className={cx('profile-img')} />
                    <div>
                        <h2 className={cx('profile-nickname')}>
                            {data?.nickname}
                            {data.tick && <FontAwesomeIcon className={cx('profile-tick')} icon={faCheckCircle} />}
                        </h2>
                        <p className={cx('profile-name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                        <Button primary className={cx('profile-follow')}>
                            Follow
                        </Button>
                    </div>
                </div>
                <div className={cx('action')}>
                    <ShareVideo x={-220} y={8}>
                        <div>
                            <ArrowIcon className={cx('action-icon')} />
                        </div>
                    </ShareVideo>
                    <HeadlessTippy delay={[200, 500]} offset={[0, 8]} interactive render={renderMenu}>
                        <div>
                            <MenuIcon className={cx('action-icon')} />
                        </div>
                    </HeadlessTippy>
                </div>
                <div className={cx('profile-total')}>
                    <div className={cx('total-group')}>
                        <span className={cx('total-num')}>{data?.followings_count}</span>
                        <span className={cx('total-title')}>Following</span>
                    </div>
                    <div className={cx('total-group')}>
                        <span className={cx('total-num')}>{data?.followers_count}</span>
                        <span className={cx('total-title')}>Followers</span>
                    </div>
                    <div className={cx('total-group')}>
                        <span className={cx('total-num')}>{data?.likes_count}</span>
                        <span className={cx('total-title')}>Likes</span>
                    </div>
                </div>
                <h3 className={cx('bio')}>{data?.bio}</h3>
                <a className={cx('bio-link')} href={data?.website_url}>
                    {data?.website_url}
                </a>
            </header>
            <div className={cx('content')}>
                <div className={cx('tags')}>
                    <p className={cx('tab-item', 'active')}>Videos</p>
                    <p className={cx('tab-item')}>
                        <FontAwesomeIcon icon={faLock} />
                        <span>Liked</span>
                    </p>
                    <div className={cx('underline')}></div>
                </div>
                {videos.length > 0 && <VideoPreview videos={videos} />}
                {videos.length === 0 && (
                    <div className={cx('no-content')}>
                        <div>
                            <p className={cx('title')}>No content</p>
                            <p className={cx('description')}>This user has not published any videos.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShareVideo.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';
import {
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    LinkIcon,
    LinkedinIcon,
    PlaneIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const SHARE_ITEMS = [
    {
        title: 'Embed',
        icon: <EmbedIcon />,
    },
    {
        title: 'Send to friends',
        icon: <PlaneIcon />,
    },
    {
        title: 'Share to facebook',
        icon: <FacebookIcon />,
    },
    {
        title: 'Share to WhatsApp',
        icon: <WhatsappIcon />,
    },
    {
        title: 'Copy link',
        icon: <LinkIcon />,
    },
];

const EXPANDED_SHARE_ITEMS = [
    ...SHARE_ITEMS,
    {
        title: 'Share to Twitter',
        icon: <TwitterIcon />,
    },
    {
        title: 'Share to LinkedIn',
        icon: <LinkedinIcon />,
    },
    {
        title: 'Share to Reddit',
        icon: <RedditIcon />,
    },
    {
        title: 'Share to Telegram',
        icon: <TelegramIcon />,
    },
    {
        title: 'Share to Email',
        icon: <EmailIcon />,
    },
];

function ShareVideo({ children }) {
    const [expanded, setExpanded] = useState(false);
    const handleShare = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('wrapper')}>
                <ul className={cx('share-list')}>
                    {expanded
                        ? EXPANDED_SHARE_ITEMS.map((item) => (
                              <li className={cx('share-item')} key={item.title}>
                                  <span>{item.icon}</span>
                                  <h3 className={cx('name')}>{item.title}</h3>
                              </li>
                          ))
                        : SHARE_ITEMS.map((item) => (
                              <li className={cx('share-item')} key={item.title}>
                                  <span>{item.icon}</span>
                                  <h3 className={cx('name')}>{item.title}</h3>
                              </li>
                          ))}
                    <button className={cx('more-btn')} onClick={() => setExpanded(!expanded)}>
                        {expanded ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                    </button>
                    <div className={cx('arrow')} data-popper-arrow="" />
                </ul>
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            <HeadlessTippy placement="top" offset={[90, 18]} delay={[50, 500]} interactive render={handleShare}>
                {children}
            </HeadlessTippy>
        </div>
    );
}

ShareVideo.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShareVideo;

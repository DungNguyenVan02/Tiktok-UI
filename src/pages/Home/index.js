import { useState, useEffect } from 'react';
import Video from '~/components/Video';
import * as videoService from '~/services/videoService';
function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.video('for-you', page);
            setVideos((prev) => [...prev, ...result.data]);
        };
        fetchApi();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if ((window.scrollY || document.documentElement.scrollTop) + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    };

    const handleAdjustVolume = (e) => {
        setVolume(e.target.value / 100);
    };
    const toggleMuted = () => {
        if (muted) {
            setVolume(0.5);
            setMuted(false);
        } else {
            setVolume(0);
            setMuted(true);
        }
    };
    return (
        <div>
            {videos.map((video, index) => (
                <Video
                    key={index}
                    data={video}
                    volume={volume}
                    adjustVolume={handleAdjustVolume}
                    toggleMuted={toggleMuted}
                />
            ))}
        </div>
    );
}

export default Home;

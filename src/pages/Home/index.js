import { useState, useEffect } from 'react';
import Video from '~/components/Video';
import * as videoService from '~/services/videoService';
function Home() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.video('for-you', 1);
            setVideos(result.data);
        };
        fetchApi();
    }, []);
    return (
        <div>
            {videos.map((video) => (
                <Video key={video.id} data={video} />
            ))}
        </div>
    );
}

export default Home;

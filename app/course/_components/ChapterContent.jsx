import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { CheckCircle, XCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function ChapterContent({ courseInfo }) {
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const [completedChapters, setCompletedChapters] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedChapters')) || [];
    setCompletedChapters(stored);
  }, []);

  const markAsCompleted = () => {
    const updated = [...new Set([...completedChapters, selectedChapterIndex])];
    setCompletedChapters(updated);
    localStorage.setItem('completedChapters', JSON.stringify(updated));
  };

  const markAsIncomplete = () => {
    const updated = completedChapters.filter(index => index !== selectedChapterIndex);
    setCompletedChapters(updated);
    localStorage.setItem('completedChapters', JSON.stringify(updated));
  };

  if (!courseInfo?.courses) {
    return <div className="p-10">Loading chapter...</div>;
  }

  const courseContent = courseInfo?.courses?.courseContent?.flat();
  const chapter = courseContent?.[selectedChapterIndex];
  const videoData = chapter?.youtubeVideo;
  const topics = chapter?.topics;

  const isCompleted = completedChapters.includes(selectedChapterIndex);

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>
          {selectedChapterIndex + 1}. {chapter?.chapterName}
        </h2>
        <Button
          variant={isCompleted ? 'outline' : 'default'}
          onClick={isCompleted ? markAsIncomplete : markAsCompleted}
        >
          {isCompleted ? (
            <>
              <XCircle className='mr-2' />
              Mark Incomplete
            </>
          ) : (
            <>
              <CheckCircle className='mr-2' />
              Mark as Completed
            </>
          )}
        </Button>
      </div>

      {/* Related Videos */}
      {/* {videoData?.length > 0 && (
        <>
          <h2 className='my-2 font-bold text-lg'>Related Videos</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {videoData.slice(0, 2).map((video, index) => (
              <div key={index}>
                <YouTube videoId={video?.videoId} opts={{ height: '250', width: '400' }} />
              </div>
            ))}
          </div>
        </>
      )} */}

      <div className='mt-7'>
        {topics?.length > 0 ? (
          topics.map((topic, index) => (
            <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
              <h2 className='font-bold text-2xl text-primary'>{index + 1}. {topic?.topic}</h2>
              <div dangerouslySetInnerHTML={{ __html: topic?.content }} style={{ lineHeight: '2.5' }}></div>
            </div>
          ))
        ) : (
          <p>No topics available.</p>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;

import { Gift } from 'lucide-react';
import React from 'react';

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className='font-bold text-3xl mt-10'>Chapters & Topics</h2>
      <div className='flex flex-col items-center justify-center mt-10'>
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className='flex flex-col items-center'>
            {/* Chapter Card */}
            <div className='p-4 border shadow rounded-2xl bg-primary text-white w-[300px] text-center'>
              <h2>Chapter {chapterIndex + 1}</h2>
              <h2 className='font-bold text-lg'>{chapter.chapterName}</h2>
              <h2 className='text-xs flex justify-between px-4'>
                <span>Duration: {chapter?.duration}</span>
                <span>No. of Chapters: {chapter?.topics?.length}</span>
              </h2>
            </div>

            {/* Topics */}
            <div className='flex flex-col items-center mt-4 w-full'>
            {chapter?.topics.map((topic, index) => (
              <div className='flex flex-col items-center' key={index}>
                {/* Vertical line above circle */}
                <div className='h-10 bg-gray-300 w-1'></div>

                {/* Topic Row */}
                <div className={`p-4 border rounded-2xl text-center flex items-center justify-center gap-6 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <div className='w-[250px] text-sm text-gray-800'>
                    {topic}
                  </div>
                  <div className='flex items-center justify-center rounded-full bg-gray-300 w-8 h-8 text-black font-semibold'>
                    {index + 1}
                  </div>
                </div>

                {/* Vertical line below last topic + Gift */}
                {index === chapter.topics.length - 1 && (
                  <>
                    <div className='h-10 bg-gray-300 w-1'></div>
                    <div className='flex items-center justify-center rounded-full bg-gray-500 p-2'>
                      <Gift className='text-white w-5 h-5' />
                    </div>
                    <div className='h-10 bg-gray-300 w-1'></div>
                  </>
                )}
              </div>
            ))}
            </div>
          </div>
        ))}

        {/* Finish */}
        <div className='p-4 border shadow rounded-xl bg-green-600 text-white mt-10'>
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;

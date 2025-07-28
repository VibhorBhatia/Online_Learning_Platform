import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const flattenedCourseContent = courseContent?.flat();
  const {selectedChapterIndex,setSelectedChapterIndex}=useContext(SelectedChapterIndexContext);
  let completedChapter=enrollCourse?.completedChapter??[];

  return (
    <div className="w-80 bg-secondary h-screen p-5">
      <h2 className="my-3 font-bold text-xl">Chapters ({courseContent?.length})</h2>
      <Accordion type="single" collapsible>
        {flattenedCourseContent?.map((chapter, index) => (
          <AccordionItem value={chapter.chapterName} key={index} onClick={()=>setSelectedChapterIndex(index)}>
            <AccordionTrigger className={'text-md font-medium px-5'}>
              {index + 1}. {chapter.chapterName}
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {chapter.topics?.map((topic, idx) => (
                  <h2 key={idx} className={`my-1 p-3 rounded-lg ${completedChapter.includes(index) ? 'bg-green-500 text-green-800':'bg-white'}`}>
                    {topic.topic}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;

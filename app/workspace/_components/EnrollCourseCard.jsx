import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EnrollCourseCard({ course, enrollCourse }) {
  const courseJson = course?.courseJson?.course;
  const CalculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 0;

    if (total === 0 || completed === 0) return null;

    const percent = (completed / total) * 100;
    return Math.round(Math.min(percent, 100)); // Ensures it's a number
  };

  return (
    <div className="shadow rounded-xl flex items-center justify-center mt-7">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name}
        width={400}
        height={300}
        className=" aspect-video rounded-t-xl object-cover"
      />
      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <h2 className="flex justify-between text-sm text-primary">
            Progress <span>{CalculatePerProgress()}%</span>
          </h2>
          <Progress
            value={CalculatePerProgress()}
            className="relative overflow-hidden bg-gray-200 rounded h-3 w-full"
          >
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${CalculatePerProgress() ?? 0}%` }}
            />
          </Progress>

          <Link href={"/workspace/view-course/" + course?.cid}>
            <Button className={"w-full mt-3"}>
              <PlayCircle />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
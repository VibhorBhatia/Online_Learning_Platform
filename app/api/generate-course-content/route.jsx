/*import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `You are a JSON-only responder.
Input: Chapter with topics.
Output: A strict JSON array following this schema:

[
  {
    "chapterName": "<Chapter Name>",
    "topics": [
      {
        "topic": "<Topic Title>",
        "content": "<HTML content>"
      }
    ]
  }
]

Return ONLY a valid JSON array. Do not add markdown (no \`\`\`). Do not explain. Just respond with the pure JSON.

User Input: `;

export async function POST(req){
    const {courseJson,courseTitle,courseId}=await req.json();
    const promises=courseJson?.chapters?.map(async(chapter)=>{
        const config = {
            responseMimeType: 'text/plain',
          };
          const model = 'gemini-2.0-flash';
          const contents = [
            {
              role: 'user',
              parts: [
                {
                  text: PROMPT+JSON.stringify(chapter),
                },
              ],
            },
          ];
        
          const response = await ai.models.generateContent({
            model,
            config,
            contents,
          });

          console.log(response.candidates[0].content.parts[0].text);
          const RawResp=response.candidates[0].content.parts[0].text;
          const RawJSon = RawResp.replace("json", "").replace("", "");
          const JSONResp = JSON.parse(RawJSon);

          const youtubeData=await GetYoutubeVideo(chapter?.chapterName);
          console.log({
            youtubeVideo:youtubeData,
            courseData:JSONResp
          });

          return{
            //youtubeVideo:youtubeData,
            courseData:JSONResp
          };
    })
    const CourseContent=await Promise.all(promises);

    const dbResp=await db.update(coursesTable).set({
            courseContent:CourseContent
    }).where(eq(coursesTable.cid,courseId));

    return NextResponse.json({
        courseName:courseTitle,
        CourseContent:CourseContent
    });
}*/

/*const  YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'

const GetYoutubeVideo=async(topic)=>{
    const params={
        part:'snippet',
        q:topic,
        maxResults:4,
        type:'video',
        key:process.env.YOUTUBE_API_KEY
    }
    const resp=await axios.get(YOUTUBE_BASE_URL,{params});
    const youtubeVideoListResp=resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item=>{
        const data={
            videoId:item.id?.videoId,
            title:item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList",youtubeVideoList);
    return resp.data.items;
}*/

import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `You are a JSON-only responder.
Input: Chapter with topics.
Output: A strict JSON array following this schema:

[
  {
    "chapterName": "<Chapter Name>",
    "topics": [
      {
        "topic": "<Topic Title>",
        "content": "<HTML content>"
      }
    ]
  }
]

Return ONLY a valid JSON array. Do not add markdown (no \`\`\`). Do not explain. Just respond with the pure JSON.

User Input: `;

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    const promises = courseJson?.chapters?.map(async (chapter) => {
      const config = {
        responseMimeType: "text/plain",
      };

      const model = "gemini-2.0-flash";
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: PROMPT + JSON.stringify(chapter),
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log("Raw Response from Gemini:\n", RawResp);

      // Sanitize output
      const cleaned = RawResp
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        const parsed = JSON.parse(cleaned);
        return parsed;
      } catch (parseErr) {
        console.error("JSON parsing failed for:", cleaned);
        throw new Error("Invalid JSON from Gemini model.");
      }
    });

    const CourseContent = await Promise.all(promises);

    const dbResp=await db.update(coursesTable).set({
      courseContent:CourseContent
    }).where(eq(coursesTable.cid,courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error("Error in generate-course-content route:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}

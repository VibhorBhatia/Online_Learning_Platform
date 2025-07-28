'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';

function CourseList() {
    const [courseList, setCourseList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
      user && GetCourseList();
    },[user]);

    const GetCourseList = async () => {
      try {
        const result = await axios.get('/api/courses');
        console.log('Courses fetched:', result.data);
        setCourseList(result.data);
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      }
    };    

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-xl'>Course List</h2>
      {
        courseList?.length==0?<div className='flex flex-col p-7 items-center justify-center border rounded-xl mt-2 bg-secondary'>
            <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
            <h2 className='my-2 text-xl font-bold'>No Courses Created</h2>
            <AddNewCourseDialog>
              <Button className='cursor-pointer'>+ Create Course</Button>
            </AddNewCourseDialog>
        </div>  :
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
          {courseList?.map((course,index)=>(
            <CourseCard course={course} key={index}/>
          ))}
        </div>}
    </div>
  )
}

export default CourseList

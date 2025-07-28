'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import CourseCard from '../_components/CourseCard';

function Explore() {
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
    <div>
        <h2 className='font-bold text-3xl mb-6'>Explore More Courses</h2>
        <div className='flex gap-5 max-w-md'>
            <Input placeholder="Search"/>
            <Button><Search/>Search</Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-7'>
          {courseList?.map((course,index)=>(
            <CourseCard course={course} key={index}/>
          ))}
        </div>
    </div>
  )
}

export default Explore
"use client"
import React, { useEffect, useState } from 'react';
import EnrollCourseCard from './EnrollCourseCard';

const EnrollCourseList = () => {
    const [enrollCourses, setEnrollCourses] = useState([]);

    useEffect(() => {
        async function fetchEnrolledCourses() {
            try {
                const response = await fetch('/api/enroll-course');
                const data = await response.json();
                console.log("Raw API response:", data); // Should log an array
                setEnrollCourses(data); // ✅ Use data directly, not data.data
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        }
    
        fetchEnrolledCourses();
    }, []);    

    if (enrollCourses.length === 0) {
        console.log("Not found");
        return <div className="text-white">No enrolled courses found.</div>;
    }

    return (
        <div className="flex flex-col gap-4">
          {enrollCourses.map((item, index) => {
            console.log("Course:", item.courses);
            console.log("Enroll Info:", item.enrollCourse);
      
            return (
              <EnrollCourseCard
                key={index}
                course={item.courses}
                enrollCourse={item.enrollCourse}
              />
            );
          })}
        </div>
      );
      
};

export default EnrollCourseList;

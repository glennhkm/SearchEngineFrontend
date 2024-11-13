"use client"

import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Tes = () => {
  const router = useRouter();
  const [newsResult, setNewsResult] = useState({});
  const pathname = usePathname();
  
  useEffect(() => {
    const getNewsBySlug = async () => {
      try {
        const result = await axios.get(`http://localhost:5000${pathname}`)
        console.log(result.data);
        setNewsResult(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewsBySlug();
  }, []);
  return (
    <div>tes</div>
  )
}

export default Tes
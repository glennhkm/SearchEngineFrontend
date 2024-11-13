"use client"

import { AnimatedTooltip } from '@/components/aceternity/animatedTooltip'
import { BackgroundBeams } from '@/components/aceternity/backgroundBeams'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu/dropdownMenu"
import { FormSearch } from '@/components/formSearch/formSearch'
import { GalleryVerticalEnd, HandCoins, Medal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [category, setCategory] = useState({
    option: 'All',
    icon: <GalleryVerticalEnd />
  })
  const categoryOptions = [
    {
      option: 'All',
      icon: <GalleryVerticalEnd />
    }, 
    {
      option: 'Sport',
      icon: <Medal />
    }, 
    {
      option: 'Ekonomi',
      icon: <HandCoins />
    }, 
  ]
  const router = useRouter()
  const anggotaKelompok = [
    {
      id: 1,
      name: "Glenn Hakim",
      designation: "2208107010072",
      image:
        "/images/glenn.jpeg",
    },
    {
      id: 2,
      name: "Muhammad Raihan",
      designation: "2208107010021",
      image:
        "/images/raihan.jpeg",
    },
    {
      id: 3,
      name: "Agil Mughni",
      designation: "2208107010025",
      image:
        "/images/agil.jpeg",
    },
  ]

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue === "") {
      return;          
    }
    const lowerCaseCategory = category.option.toLowerCase()
    router.push(`/search?category=${lowerCaseCategory}&q=${searchValue}`)
  }

  return (
    <div className='w-screen h-screen relative flex flex-col justify-center items-center gap-4'>
      <div className='flex'> 
        <AnimatedTooltip items={anggotaKelompok} />
      </div>
      <div className='flex flex-col gap-2 w-1/2 text-center'>
        <h1 className='text-[5rem] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-bold'>Team 9</h1>
        <p className='text-neutral-500 '>Welcome to our search engine platform! This site was created by Team 9 (Glenn, Agil, and Raihan) for our Information Retrieval project. Here, you can explore the latest information on sports and economics, sourced directly from TVOneNews. Dive in and discover insights with ease – happy searching!</p>
      </div>
      <p className='text-left w-1/2 -mb-2 font-bold text-neutral-300'>Category</p>
      <div className='flex gap-4 items-center w-1/2 mb-12'>
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-[#151515] border-[1px] border-white/20 outline-none p-3 w-32 rounded-xl flex gap-2 hover:scale-[1.03] duration-200'>
            {category.icon}
            <p className='text-neutral-300 text-center w-full'>{category.option}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='outline-none bg-[#151515] border-[1px] border-white/20 rounded-xl'>
            {categoryOptions.map((option, index) => (
              <DropdownMenuItem key={index} onSelect={() => setCategory(option)} className='hover:bg-white/10 cursor-pointer flex rounded-xl'>
                {option.icon}
                <p className='text-neutral-300'>{option.option}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <FormSearch inputClassName='py-3' formClassName='bg-white/20 w-full' setSearchValue={setSearchValue} searchValue={searchValue} searchHandler={searchHandler}/>
      </div>
      <BackgroundBeams />      
    </div>
  )
}

export default Home
"use client"

import { FormSearch } from "@/components/formSearch/formSearch";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu/dropdownMenu"
import { GalleryVerticalEnd, HandCoins, LoaderCircleIcon, Medal, Search } from "lucide-react";
import search from "@/lottieJson/search.json";
import Lottie from "lottie-react";
import { NewsModal } from "@/components/newsModal/newsModal";
import https from "https";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";  
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("q") || "");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResultsPage, setSearchResultsPage] = useState<any[]>([]);
  const [arrayPagination, setArrayPagination] = useState(Array(0).fill(0))
  const [isLoading, setIsLoading] = useState(true)
  const [isShowNews, setIsShowNews] = useState(false)
  const [resultShow, setResultShow] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter();
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
  const initialCategory = categoryOptions.find(option => option.option.toLowerCase() === searchParams.get("category")) || categoryOptions[0];
  const [category, setCategory] = useState(initialCategory);
 
  useEffect(() => {    
    setTimeout(() => {
      const formElement = document.querySelector("form");
      if (formElement) {
          const event = new Event("submit", { bubbles: true, cancelable: true });
          formElement.dispatchEvent(event);
      }
    }, 1000);
  }, []);

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {      
      setIsLoading(true)
      if (searchValue === "") {
        setIsLoading(false)
        return;          
      }
      router.replace(`/search?category=${initialCategory.option.toLowerCase()}&q=${searchValue}`);
      const result = await axios.post(
        `${apiBaseUrl}/search`,
        {
          query: searchValue,
          category: category.option,
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      );         
      const lengthPagination = Math.ceil(result.data.length / 10)      
      setArrayPagination(new Array(lengthPagination).fill(0));
      setIsLoading(false)
      setCurrentPage(1)
      setSearchResults(result.data);
      setSearchResultsPage(result.data.slice(0, 10))
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  const getByCategory = async (option: { option: string; icon: JSX.Element; }) => {
    setCategory(option);
    try {      
      setIsLoading(true)
      if (searchValue === "") {
        setIsLoading(false)
        return;
      }
      router.replace(`/search?category=${option.option.toLowerCase()}&q=${searchValue}`);
      const result = await axios.post(
        `${apiBaseUrl}/search`,
        {
          query: searchValue,
          category: option.option,
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      );      
      const lengthPagination = Math.ceil(result.data.length / 10)      
      setArrayPagination(new Array(lengthPagination).fill(0));
      setIsLoading(false)
      setCurrentPage(1)
      setSearchResults(result.data);
      setSearchResultsPage(result.data.slice(0, 10))
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  const setPagination = async (page: number) => {
    const skip = (page - 1) * 10
    const endIndex = skip + 10
    const searchResultsNew = searchResults.slice(skip, endIndex)
    setCurrentPage(page)
    setSearchResultsPage(searchResultsNew as any)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const getNewsBySlugAndCategory = async (result: any) => {
    try {
      const category = result.category.toLowerCase()
      const slug = result.slug
      const resultData = await axios.get(
        `${apiBaseUrl}/news/${category}/${slug}`,
        {
          httpAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      );      
      setResultShow(resultData.data)
      setIsShowNews(true)
      console.log(resultData)
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }

return (
  <div className="flex w-full">
    {isShowNews && (
      <NewsModal closeModal={() => setIsShowNews(false)} newsData={resultShow}/>
    )}
    <div className={`w-1/2 h-full py-16 flex flex-col gap-3 relative`}>
        <div className="w-full px-8 flex gap-6 items-center fixed bg-[#151515] top-0 pt-16 pb-8 z-[100]">
            <Link href={"/"} className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-bold" >
                Team 9
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className='bg-[#151515] border-[1px] border-white/20 outline-none p-3 rounded-xl flex gap-2 hover:scale-[1.03] duration-200 w-32'>
                {category.icon}
                <p className='text-neutral-300 w-full text-center'>{category.option}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='z-[100] outline-none bg-[#151515] border-[1px] border-white/20 rounded-xl'>
                {categoryOptions.map((option, index) => (
                  <DropdownMenuItem key={index} onSelect={() => getByCategory(option)} className='hover:bg-white/10 cursor-pointer flex rounded-xl'>
                    {option.icon}
                    <p className='text-neutral-300'>{option.option}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <FormSearch searchValue={searchValue} setSearchValue={setSearchValue} inputClassName="py-2.5" formClassName="bg-white/10 w-[60%]" searchHandler={searchHandler} />
        </div>
        <div className="flex flex-col gap-4 w-full h-full mt-28 px-8">   
          {isLoading && (
            <div className="w-[50vw] h-screen fixed flex flex-col justify-center items-center gap-4">
              <LoaderCircleIcon className="animate-spin w-12 h-12"/>
              <p className="animate-blink font-semibold mb-32 text-xl">Retrieving...</p>
            </div>
          )}     
          {(searchResults.length === 0 && !isLoading) && (
            <div className="w-[50vw] h-screen fixed flex flex-col justify-center items-center gap-4">
              <Search className="w-20 h-20" />
              <p className="text-2xl font-bold mb-48">No result found</p>
            </div>
          )}
          {(searchResultsPage.length > 0 && !isLoading) && 
            searchResultsPage.map((result: any, index: number) => (
              <div key={index} className="flex flex-col gap-2 hover:cursor-pointer duration-200 hover:scale-[1.02]" onClick={() => getNewsBySlugAndCategory(result)}>
                <div className="flex justify-between items-center mb-2">
                      <div className="w-32 bg-white/90 px-3 py-2 rounded-full">
                        <Image
                            src={"https://www.tvonenews.com/appasset/responsive/img/logo/logo-tvonenews.svg?v=1.72"}
                            alt="search result"
                            width={100}
                            height={100}
                            className="w-full h-full"
                        />
                      </div>
                    <p className="text-sm text-white/40">{result.date}</p>
                </div>
                <p className="font-bold text-2xl">{result.title}</p>
                <p className="text-neutral-200">{result.summary}</p>
                <p><b>Score : </b>{result.score}</p>
                <Link target="_blank" href={result.url} className="text-xs truncate -mb-3 mt-4 hover:underline">Original News: {result.url}</Link>
                <div className="w-full h-[1px] bg-white/20 my-6"></div>
              </div>
            ))
          }            
          {(searchResultsPage.length > 0 && !isLoading) && (
            <div className="flex gap-2 absolute bottom-6">
              {arrayPagination.map((_, index) => (            
                <button key={index} onClick={() => setPagination(index + 1)} className={`flex w-8 h-8 justify-center items-center text-sm font-semibold rounded-full ${index + 1 === currentPage ? 'bg-blue-400' : 'bg-white/10 hover:bg-white/20'}`}>{index + 1}</button>
              ))}
            </div>
          )}
        </div>
    </div>
    <div className="fixed right-0 top-0 w-1/2 h-screen flex flex-col justify-center items-center px-6">
      <Lottie className="w-1/2" animationData={search} loop={true} />
      <p className="text-5xl font-bold mt-4">Happy Searching!</p>
    </div>
  </div>
  );
};

const ResultPage = () => {
  return (
    <Suspense>
      <SearchResult />
    </Suspense>
  );  
}

export default ResultPage;
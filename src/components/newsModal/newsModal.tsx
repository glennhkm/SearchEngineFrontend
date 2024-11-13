import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NewsModalProps {
  closeModal: () => void;
  newsData: any;
}

export const NewsModal = (props: NewsModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black/80 z-[150]">
      <button
        className="flex justify-end items-center w-[40%] -mb-4 -mr-6 z-[60] "
        onClick={() => props.closeModal()}
      >
        <div className="bg-red-700 p-1 rounded-full hover:scale-[1.06] duration-100">
          <X className="w-5 h-5" />
        </div>
      </button>
      <div className="w-[40%] rounded-xl flex flex-col gap-6 bg-[#151515] px-8 py-6 h-3/4 overflow-y-auto overflow-x-hidden border-[1px] border-white/20">
        <p className="text-4xl font-bold">{props.newsData.Judul}</p>
        <p className="text-neutral-500">{props.newsData.Ringkasan}</p>
        <div className="w-full flex justify-between">
            <p className="text-sm text-neutral-500"><b>Author :</b> {props.newsData.Pengarang}</p>
            <p className="text-sm text-neutral-500"><b>Date :</b> {props.newsData.Tanggal}</p>
        </div>
        <p className="text-justify">{props.newsData['Isi Berita']}</p>
        <Link className="w-full" href={props.newsData.Url}>
            <p className="text-sm truncate">Original news : <span className="text-blue-300 hover:underline">{props.newsData.Url}</span></p>
        </Link>
      </div>
    </div>
  );
};

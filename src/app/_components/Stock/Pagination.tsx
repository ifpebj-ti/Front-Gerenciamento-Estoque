"use client";

import { useState } from "react";

type Props = {
  totalPages: number;
  sendCurrentPage: (page: number) => void;
};
const Pagination = ({ totalPages, sendCurrentPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [initPage, setInitPage] = useState(1);
  const renderPages = () => {
    const pages = [];
    for (let index = initPage; index <= initPage + 4; index++) {
      if (index <= totalPages) {
        pages.push(
          <li
            onClick={() => {
              sendCurrentPage(index);
              setCurrentPage(index);
              if (initPage + 4 < totalPages) {
                setInitPage(index);
              }
            }}
            className={`hover:bg-[var(--color-primary)] hover:scale-110 hover:cursor-pointer transition-all ease-in-out duration-200 shadow-lg w-8 h-8 flex justify-center items-center text-white font-bold ${
              currentPage == index
                ? "bg-[var(--color-primary)]"
                : "bg-slate-300 "
            } rounded-full`}
            key={index}
          >
            {index}
          </li>
        );
      }
    }
    return pages;
  };

  return (
    <div className=" flex justify-center items-center mt-11">
      {totalPages > 1 && (
        <nav
          className="flex justify-center items-center gap-5"
          aria-label="Page navigation"
        >
          {currentPage == 1 ? null : (
            <>
              <div
                onClick={() => {
                  sendCurrentPage(currentPage - 1);
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                  if (initPage > 1) {
                    setInitPage(initPage - 1);
                  }
                }}
                className="hover:110 hover:cursor-pointer transition-all ease-in-out duration-200 shadow-lg hover:border-[var(--color-primary)] border-b-4 border-r-4 rotate-[130deg] border-slate-300 w-4 h-4"
              ></div>
            </>
          )}

          <ul className="flex gap-4">{renderPages()}</ul>
          {currentPage == totalPages ? null : (
            <>
              <div
                onClick={() => {
                  sendCurrentPage(currentPage + 1);
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                  if (initPage + 4 <= totalPages) {
                    setInitPage(initPage + 1);
                  }
                }}
                className="hover:110 hover:cursor-pointer transition-all ease-in-out duration-200 shadow-lg hover:border-[var(--color-primary)] border-b-4 border-r-4 rotate-[310deg] border-slate-300 w-4 h-4"
              ></div>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default Pagination;

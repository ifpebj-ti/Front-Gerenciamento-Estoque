"use client";
import SelectSession from "../_components/Admin/SelectSession";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";
import OPTIONS from "../_CONSTANTS/OptionsSession";

const admin = () => {
  return (
    <>
      <Header></Header>
      <main className="max-w-[1100px] gap-8  w-full px-8 flex flex-col justify-center items-center mx-auto mt-8 mb-20">
        <SelectSession
          sendOption={(option: number) => {}}
          options={OPTIONS}
        ></SelectSession>
        <FilterProducts
          sendCategory={(category: string) => {}}
          sendName={(name: string) => {}}
        ></FilterProducts>
      </main>
    </>
  );
};

export default admin;

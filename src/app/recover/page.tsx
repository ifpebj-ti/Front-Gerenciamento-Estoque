"use client";

import PopUpEmailNotify from "../_components/AuthForms/PopUpEmailNotify/PopUpEmailNotify";
import RegisterComponent from "../_components/AuthForms/RegisterComponent/RegisterComponent";

const Recover = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center absolute bg-black/50 z-20">
        <PopUpEmailNotify email=""></PopUpEmailNotify>
      </div>
      <RegisterComponent route="recover"></RegisterComponent>
    </>
  );
};

export default Recover;

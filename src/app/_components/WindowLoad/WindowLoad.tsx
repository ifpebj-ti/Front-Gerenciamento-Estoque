const WindowLoad = () => {
  return (
    <div className="bg-black/75 fixed w-full h-full z-50 flex justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white"></div>
        <p className="text-white animate-pulse font-bold text-lg">Loading</p>
      </div>
    </div>
  );
};

export default WindowLoad;

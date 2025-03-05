import { RootState } from "@/app/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinning from "@/components/ui/spinning";

type Props = {};

const Loading = (props: Props) => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  if (!loading) return <></>;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen items-center block p-6 bg-white bg-opacity-75 border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700 z-50">
      <div
        role="status"
        className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
       <Spinning className="mx-auto"/>
      </div>
    </div>
  );
};

export default Loading;

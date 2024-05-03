import React from "react";

const FormContainer = ({ heading, children }) => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-full mt-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white my-4">
        {heading}
      </h1>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;

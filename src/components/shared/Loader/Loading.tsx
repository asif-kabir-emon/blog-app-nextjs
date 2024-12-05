import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-full py-auto md:py-80">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;

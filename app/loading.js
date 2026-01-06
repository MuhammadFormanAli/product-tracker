import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center gap-5">
        {/* Animated dots */}
        <div className="flex gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600" />
        </div>

        <p className="text-sm tracking-wide text-gray-600">Loading your data</p>
      </div>
    </div>
  );
};

export default Loading;

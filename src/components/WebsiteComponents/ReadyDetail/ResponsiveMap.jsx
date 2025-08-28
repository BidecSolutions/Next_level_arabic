"use client";

import { useEffect, useState } from "react";

const ResponsiveMap = ({ iframe }) => {
  const [sanitizedIframe, setSanitizedIframe] = useState("");

  useEffect(() => {
    if (iframe) {
      // Remove width and height attributes to make it responsive
      const updatedIframe = iframe
        .replace(/width="\d+"/g, 'width="100%"')
        .replace(/height="\d+"/g, 'height="100%"')
        .replace(/style="[^"]*"/g, 'style="border:0;"'); // Keep only border style

      setSanitizedIframe(updatedIframe);
    }
  }, [iframe]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg pb-[56.25%] mb-4 shadow-lg">
      {/* 16:9 ratio */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        dangerouslySetInnerHTML={{ __html: sanitizedIframe }}
      />
    </div>
  );
};

export default ResponsiveMap;

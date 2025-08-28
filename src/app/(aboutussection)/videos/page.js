import { Banner } from "@/components/WebsiteComponents/PopularVideos/Banner";
import Videos from "@/components/WebsiteComponents/PopularVideos/Videos";
// import { useRouter } from "next/router";
// import { useEffect } from "react";


const PopularVideos = () => {
//   const router = useRouter();

//   useEffect(() => {
//     if (router.isReady) {
//       // Redirect if URL does not end with '/'
//       if (!router.asPath.endsWith("/")) {
//         router.replace(`${router.asPath}/`);
//       }
//     }
//   }, [router.isReady, router.asPath]);

  return (
    <>
      <Banner />
      <Videos />
    </>
  );
};

export default PopularVideos;

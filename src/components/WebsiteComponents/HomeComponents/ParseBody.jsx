import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

// Helper function to create sanitized HTML
const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

// Component
const ParseBody = ({ body }) => {
  const options = {
    replace: (domNode) => {
      // Handle h1 tags
      if (domNode.name === "h1") {
        return (
          <h1 className="text[40px] font-bold my-4">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </h1>
        );
      }

       // Handle h2 tags
      if (domNode.name === "h2") {
        return (
          <h2 className="my-3 font-semibold">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </h2>
        );
      }

      // Handle h3 tags
      if (domNode.name === "h3") {
        return (
          <h3 className="my-3 ">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </h3>
        );
      }

      // Handle h4 tags
      if (domNode.name === "h4") {
        return (
          <h4 className="text-[18px]    font-semibold my-3 ">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </h4>
        );
      }

      // Handle h5 tags
      if (domNode.name === "h5") {
        return (
          <h5 className="text[16px] font-medium my-2 ">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </h5>
        );
      }

      // Handle span tags
      if (domNode.name === "span") {
        return (
          <span className="text[10px]    ">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </span>
        );
      }

      // Handle img tags
      if (domNode.name === "img") {
        return (
          <img
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || "Image"}
            className="my-4 w-full rounded"
          />
        );
      }

      // Handle ul tags (unordered list)
      // if (domNode.name === "ul") {
      //   return (
      //     <ul className="list-disc ml-6 my-4 ">
      //       {domNode.children?.map((child, index) => parse(createMarkup(child.outerHTML)))}
      //     </ul>
      //   );
      // }

      // Handle ol tags (ordered list)
      // if (domNode.name === "ol") {
      //   return (
      //     <ol className="list-decimal ml-6 my-4 ">
      //       {domNode.children?.map((child, index) => parse(createMarkup(child.outerHTML)))}
      //     </ol>
      //   );
      // }

      // Handle li tags (list items)
      if (domNode.name === "li") {
        return (
          <li className="list-disc   ml-6 my-2 ">
            {domNode.children?.map((child, index) =>
              child.data || child.children
                ? child.data || child.children[0]?.data
                : null
            )}
          </li>
        );
      }
    },
  };

  return (
    <div className="mb-2 ">
      {parse(DOMPurify.sanitize(body || ""), options)}
    </div>
  );
};

export default ParseBody;
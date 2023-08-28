// import * as React from "react"
import { useTypewriter, Cursor } from "react-simple-typewriter";
export const App = () => {
  const [text] = useTypewriter({
    words: ["Commerce"],
    typeSpeed: 180,
    loop: 0,
  });

  type anyCard = {
    text: string;
    image: string;
  };

  const Card = (props: anyCard) => {
    const { text, image } = props;
    return (
      <>
        <div className="relative">
          <div className="absolute bottom-2 right-2 -left-2 hover:bottom-1 hover:right-1 hover:-left-1 border-[1px] border-black h-64 xs:h-80 bg-[#F3E99F] p-4">
            <div className="">
              <img src={image} alt="" className="border-[1px] border-black object-cover aspect-w-1 aspect-h-1" />
            </div>
            <p className="font-bold text-2xl">{text}</p>
          </div>
          <div className="lg:h-80 md:h-80 sm:h-80 xs:h-64 bg-black"></div>
        </div>
      </>
    );
  };

  const listItem: string[] = ["baju", "sepatu", "celana", "topi", "jaket", "kemeja", "kacamata", "tas", "kaos kaki"];

  return (
    <>
      <div className="h-screen min-w-full flex">
        <div className=" w-[100%] lg:w-[70%]  p-2 overflow-y-scroll">
          <p className="text-3xl">
            E-<span className="font-extrabold text-[#98D8AA]">{text}</span>
            <Cursor cursorStyle={"_"} />
          </p>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            {listItem?.map((item, index) => (
              <Card key={index} text={item} image="https://qph.cf2.quoracdn.net/main-qimg-8dd55093f2689fdaaefdef7f11607db7-lq" />
            ))}
          </div>
        </div>
        <div className="border-[1px] border-black w-[30%] bg-[#F7D060] hidden lg:block">Cart</div>
      </div>
    </>
  );
};

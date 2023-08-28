import { Tooltip } from "@nextui-org/react";

interface anyCard {
    title: string;
    image: string;
    price: number;
    id: number;
    addCart: (id: number) => void;
}

export default function Card(props: anyCard) {
    const { title, image, price, addCart, id } = props;

    return (
        <>
            <div className="">
                <div className="shadow-xl flex flex-col gap-2 border-[1px] border-black h-auto bg-[#F3E99F] p-4 ">
                    <img src={image} alt="" className="border-[1px] border-black bg-white object-contain h-52 w-auto" />
                    <div className="">
                        <Tooltip content={title} color="foreground">
                            <p className="font-bold text-xl h-9 truncate">{title}</p>
                        </Tooltip>
                        <p>${price}</p>
                    </div>
                    <div onClick={() => addCart(id)} className=" mx-auto border-[1px] border-black w-full flex justify-center bg-[#FF6D60] hover:bg-[#f84c3c] cursor-pointer">
                        Add to cart
                    </div>
                </div>
                {/* <div className="relative top-[-340px] left-2 z-[-99] lg:h-80 h-auto w-auto bg-black"></div> */}
            </div>
        </>
    );
}

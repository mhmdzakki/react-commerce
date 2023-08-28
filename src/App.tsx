import * as React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Card from "./components/Card";
import { ShoppingCart, X } from "react-feather";
import { getProducts, getProductById } from "./services/api";
import { useQuery } from "react-query";
import { Badge, ScrollShadow } from "@nextui-org/react";

// import {Button} from "@nextui-org/react"

export default function App() {
    interface Product {
        title: string;
        image: string;
        price: number;
        id: number;
        quantity: number;
    }

    // const [loadingComplete, setLoadingComplete] = React.useState(false);
    const [totalPrice, settotalPrice] = React.useState<number>(0);
    const [cart, setCart] = React.useState<number[]>([]);
    const [datas, setDatas] = React.useState<Product[]>([]);
    const [showCart, setShowCart] = React.useState(false);

    const handleCart = async (id: number) => {
        try {
            const productData = await getProductById(id);
            settotalPrice((prev) => prev + productData.price);
            const existingProduct = datas.find((product) => product.id === id);
            setCart([...cart, id]);

            if (existingProduct) {
                const updatedCart = datas.map((product) => (product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
                setDatas(updatedCart);
            } else {
                // const newProduct = { ...productData, quantity: 1 };
                // setDatas([...datas, newProduct]);
                setDatas([...datas, { id: productData.id, title: productData.title, image: productData.image, price: productData.price, quantity: 1 }]);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const addQuantity = (id: number) => {
        const tambahCart = datas.map((product) => (product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
        setDatas(tambahCart);
        setCart([...cart, id]);
    };

    const subtractQuantity = (id: number) => {
        const kurangCart = datas.map((product) => (product.id === id ? { ...product, quantity: product.quantity - 1 } : product));
        setDatas(kurangCart);
        const newCart = [...cart];
        newCart.pop();
        setCart(newCart);

        const product = datas.find((product) => product.id === id);
        if (product) {
            settotalPrice((prev) => prev - product.price);
        }
    };

    const handleShowCart = () => {
        setShowCart(!showCart);

        console.log(datas[0].quantity);
    };

    const { data: products = [] } = useQuery<Product[]>("products", getProducts);
    // const { isLoading, data: product = [] } = useQuery<Product[]>("product", getProduct);

    const [text] = useTypewriter({
        words: ["Commerce"],
        typeSpeed: 180,
        loop: 0,
    });

    return (
        <>
            {/* <Progress size="sm" value={isLoading ? 0 : 100} className={loadingComplete ? "hidden" : "block"} /> */}
            <div className="h-screen min-w-full mx-auto p-4 flex">
                <ScrollShadow hideScrollBar className=" w-[100%] lg:w-[70%]  p-2 ">
                    <div className="flex justify-between items-center cursor-pointer">
                        <p className="text-3xl">
                            E-<span className="font-extrabold text-[#98D8AA]">{text}</span>
                            <Cursor cursorStyle={"|"} />
                        </p>
                        <div className="block lg:hidden">
                            <Badge onClick={handleShowCart} content={cart.length} className={`ps-1 text-white text-2 me-1 ${cart.length > 0 ? "block" : "hidden"}`} color="danger">
                                <ShoppingCart />
                            </Badge>
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                        {products?.map((product, index) => (
                            <Card addCart={() => handleCart(product.id)} key={index} title={product.title} image={product.image} id={product.id} price={product.price} />
                        ))}
                    </div>
                </ScrollShadow>
                <div className="lg:flex flex-col gap-4 border-[1px] border-black w-[30%] bg-[#5B9A8B] hidden p-1">
                    <p className="font-bold text-2xl">Order summary</p>
                    <hr className="mx-2 opacity-50" />
                    <ScrollShadow hideScrollBar className="flex flex-col gap-4 ">
                        {datas?.map(
                            (data, index) =>
                                data.quantity > 0 && (
                                    <div key={index} className={"px-2 py-1 h-auto flex items-center justify-between border-[1px] border-black"}>
                                        <div className="w-20 flex items-center justify-center bg-white border-[1px] border-black">
                                            <img src={data.image} className="object-contain h-12 w-auto" alt="" />
                                        </div>
                                        <div className="flex border-[1px] border-black w-24">
                                            <div onClick={() => subtractQuantity(data.id)} className="flex justify-center cursor-pointer font-bold w-[30%]">
                                                -
                                            </div>
                                            <div className="border-x-[1px] border-black flex justify-center items-center w-[80%]">{data.quantity}</div>
                                            <div onClick={() => addQuantity(data.id)} className="flex justify-center  cursor-pointer font-bold w-[30%]">
                                                +
                                            </div>
                                        </div>
                                        <div className="w-10 flex justify-end">
                                            <p>${data.price}</p>
                                        </div>
                                    </div>
                                )
                        )}
                    </ScrollShadow>
                    <div className="flex-grow"></div>
                    <div>
                        <div className="flex justify-between mb-4 font-bold text-xl">
                            <span>Total price:</span>${totalPrice.toFixed(2)}
                        </div>
                        <div className="flex justify-center py-2 border-[1px] border-black bg-[#00425A] cursor-pointer">
                            <p className="font-bold text-white">Place order</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`inset-0 z-10 min-w-full h-screen flex flex-col gap-4 border-[1px] border-black bg-[#5B9A8B] lg:hidden p-1 ${showCart ? "absolute" : "hidden"}`}>
                <div className="flex justify-between pt-3 items-center px-2">
                    <p className="font-bold text-2xl">Order summary</p>
                    <X className="cursor-pointer" onClick={handleShowCart} />
                </div>
                <hr className="mx-2 opacity-50" />
                <ScrollShadow hideScrollBar className="flex flex-col gap-4 ">
                    {datas?.map(
                        (data, index) =>
                            data.quantity > 0 && (
                                <div key={index} className={"px-2 py-1 h-auto flex items-center justify-between border-[1px] border-black"}>
                                    <div className="w-20 flex items-center justify-center bg-white border-[1px] border-black">
                                        <img src={data.image} className="object-contain h-12 w-auto" alt="" />
                                    </div>
                                    <div className="flex border-[1px] border-black w-24">
                                        <div onClick={() => subtractQuantity(data.id)} className="flex justify-center cursor-pointer font-bold w-[30%]">
                                            -
                                        </div>
                                        <div className="border-x-[1px] border-black flex justify-center items-center w-[80%]">{data.quantity}</div>
                                        <div onClick={() => addQuantity(data.id)} className="flex justify-center  cursor-pointer font-bold w-[30%]">
                                            +
                                        </div>
                                    </div>
                                    <div className="w-10 flex justify-end">
                                        <p>${data.price}</p>
                                    </div>
                                </div>
                            )
                    )}
                </ScrollShadow>
                <div className="flex-grow"></div>
                <div>
                    <div className="flex justify-between mb-4 font-bold text-xl">
                        <span>Total price:</span>${totalPrice.toFixed(2)}
                    </div>
                    <div className="flex justify-center py-2 border-[1px] border-black bg-[#00425A] cursor-pointer">
                        <p className="font-bold text-white">Place order</p>
                    </div>
                </div>
            </div>
        </>
    );
}

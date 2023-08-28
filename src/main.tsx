// import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
const queryClient = new QueryClient();
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <NextUIProvider>
            <main className="dark ">
                <App />
            </main>
        </NextUIProvider>
    </QueryClientProvider>
);

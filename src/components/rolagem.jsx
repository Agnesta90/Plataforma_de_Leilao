import { useEffect, useRef } from "react";

export default function Rolagem({children}){
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;

        const handleWheel = (evt) => {
            evt.preventDefault();
            container.scrollLeft += evt.deltaY;
        };

        container.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    
    return(
        <>
            <div ref={ref} className="flex p-4 gap-4 mb-5 overflow-x-scroll no-scrollbar"> {children} </div>
        </>
    )
}
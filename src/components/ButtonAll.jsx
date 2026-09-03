export function Button_h({children, onClick}){
    return(
        <button onClick={() => onClick()} className="p-2 m-1 text-white cursor-pointer hidden laptop:flex m-w-18 ">
            {children}
        </button>
    )
}

export function Button_nav({children}){
    return(
        <button className="p-1.5 text-white cursor-pointer hover:bg-[#1E1C2F] flex gap-1.5 ">
            {children}
        </button>
    )
}

export function Button_menu({children, onclick}){
    return (
        <>
            <button className='w-full flex flex-row gap-1.5 items-center p-1.5 border-l-3 border-transparent cursor-pointer hover:border-l-[#3d0f78] hover:p-2 hover:bg-[#3d08665b] pl-3' onClick={() => onclick()}>{children}</button>
        </>
    )
}

export function ButtonPadrao({children, className, onclick, type}){
    return(
        <div className={className}>
            <button className="w-full h-full text-white bg-[#250F71] rounded-[10px] p-2 cursor-pointer laptop:shadow-[4px_4px_0px_#000] shadow-[4px_4px_0px_#fff] " onClick={onclick} type={type}>{children}</button>
        </div>
    )
}

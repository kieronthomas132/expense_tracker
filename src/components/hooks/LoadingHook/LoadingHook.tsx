import {AiOutlineLoading3Quarters} from "react-icons/ai";


export const useLoadingHook = () => {
    const loadingHook = () => {
        return (
            <div className="h-[100vh] w-full bg-black">
                <p className="text-white absolute left-[50%] top-[50%]">
                    <AiOutlineLoading3Quarters className='animate-spin text-[50px]'/>
                </p>
            </div>
        )
    }

    return { loadingHook };
}
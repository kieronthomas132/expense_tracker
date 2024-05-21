import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

const TriggerTabs = () => {
    return (
        <TabsList className="bg-black text-white gap-9 border border-white flex w-[60%] mx-auto">
            <TabsTrigger value="login" className="w-[60%]">
                Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-[60%]">
                Sign up
            </TabsTrigger>
        </TabsList>
    );
}

export default TriggerTabs;
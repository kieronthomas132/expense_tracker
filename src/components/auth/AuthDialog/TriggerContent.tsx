import { TabsContent } from "@/components/ui/tabs.tsx";
import Login from "@/components/auth/AuthDialog/Login.tsx";
import Signup from "@/components/auth/AuthDialog/Signup.tsx";

const TriggerContent = () => {
  return (
    <>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="signup">
        <Signup />
      </TabsContent>
    </>
  );
};

export default TriggerContent;

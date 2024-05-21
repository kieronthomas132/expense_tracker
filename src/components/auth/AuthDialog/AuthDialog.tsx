import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import {IDialogModel} from "@/components/interfaces/interfaces.tsx";
import TriggerTabs from "@/components/auth/AuthDialog/TriggerTabs.tsx";
import TriggerContent from "@/components/auth/AuthDialog/TriggerContent.tsx";

const AuthDialog = ({ open, setOpen }: IDialogModel) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] text-white bg-black">
        <Tabs defaultValue="signup">
          <TriggerTabs/>
          <TriggerContent/>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

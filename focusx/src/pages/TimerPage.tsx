import { FocusTimer } from "@/components/timer/Timer";
import { UserSidebar } from "@/components/UserSidebar";

const TimerPage = () => {
  return (
    <UserSidebar>
      <FocusTimer />
    </UserSidebar>
  );
};

export default TimerPage;

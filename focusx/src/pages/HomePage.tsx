import Dashboard from "@/components/Dashboard"
import { UserSidebar } from "@/components/UserSidebar"

const HomePage = () => {
  return (
    <UserSidebar>
      <Dashboard />
    </UserSidebar>
  )
}

export default HomePage

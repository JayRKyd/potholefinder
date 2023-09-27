import Sidebar from "../components/Sidebar"
import UserHeader from "../components/UserHeader"

export default function Layout({ children }) {
    return (
      <>
      <div className="bg-slate-500 min-h-screen">
        <UserHeader />
        <Sidebar />
        <main className="bg-slate-500 mx-auto  w-4/5">{children}</main>
        </div>
      </>
    )
  }
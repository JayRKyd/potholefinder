import UserHeader from "../components/UserHeader"
import Sidebar from "../components/Sidebar"
export default function Layout({ children }) {
  return (
    <>
    <div className="bg-slate-500 min-h-screen">
      <UserHeader />
      
      <Sidebar />
      <main className="bg-slate-500">{children}</main>
      </div>
    </>
  )
}
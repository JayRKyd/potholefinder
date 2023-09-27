import SignInHeader from "../../components/SignInHeader"

 
export default function Layout({ children }) {
  return (
    <>
    <div className="bg-slate-500 min-h-screen">
      <SignInHeader />
      <main className="bg-slate-500">{children}</main>
      </div>
    </>
  )
}
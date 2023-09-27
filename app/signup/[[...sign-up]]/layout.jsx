import SignUpHeader from "@/app/components/SignUpHeader"

 
export default function Layout({ children }) {
  return (
    <>
    
    <div className="bg-slate-500 min-h-screen flex-items center justify-center">
      <SignUpHeader />
      <main className="bg-slate-500">{children}</main>
      </div>
    </>
  )
}
import ReportPotholeHeader from "../components/ReportPotholeHeader"
 
export default function Layout({ children }) {
  return (
    <>
    <div className="bg-slate-500 min-h-screen">
      <ReportPotholeHeader />
      <main className="bg-slate-500">{children}</main>
      </div>
    </>
  )
}
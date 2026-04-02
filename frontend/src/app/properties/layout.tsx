import PropertyNavbar from "@/components/property/PropertyNavbar";
export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mt-14 flex flex-col gap-4">
      <PropertyNavbar />                             
        {children}
      </div>
    </div>
  )
}
import PropertyNavbar from "@/components/property/PropertyNavbar";
export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PropertyNavbar />                             
      <div className="mt-4 flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}
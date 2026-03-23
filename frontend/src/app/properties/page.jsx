 import  PropertyFilter from "@/components/shared/PropertyFilter";
 import PropertyCard from "@/components/property/PropertyCard";
const page = () => {
  return (
    <div className="container flex   items-start gap-4 mx-auto px-4">
        <div className="w-[400px] "><PropertyFilter /> </div> 
        <div >
           <PropertyCard />
       </div> 
    </div>
  )
}

export default page

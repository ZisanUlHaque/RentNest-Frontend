import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
  return (
    <div className="font-sans">
      <Navbar user={user}/>
      {children}
      <Footer></Footer>
    </div>
  )
}

export default PublicGroupLayout
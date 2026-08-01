import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar user={user} />

      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PublicGroupLayout;
import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section className="grid place-content-center h-screen">
      <SignIn />
    </section>
  );
}
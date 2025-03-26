import ContactForm from "@/components/ContactForm/ContactForm";
import PageLayout from "@/components/Layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout title="Home">
      <p className="text-lg">
        We'd love to hear from you! Drop us a message and let’s create something
        beautiful together.
      </p>
      <ContactForm />
    </PageLayout>
  );
}

import AnimatedDiv from "@/components/AnimatedDiv/AnimatedDiv";
import PageLayout from "@/components/Layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout title="Home">
      <section id="home">
        <AnimatedDiv>
          We'd love to hear from you! Drop us a message and let’s create
          something beautiful together.
        </AnimatedDiv>
      </section>
    </PageLayout>
  );
}

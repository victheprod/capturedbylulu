import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { listTestimonials } from "@/lib/db/testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await listTestimonials(false);

  return (
    <AdminShell title="Testimonials" subtitle="Manage client reviews">
      <TestimonialsManager testimonials={testimonials} />
    </AdminShell>
  );
}

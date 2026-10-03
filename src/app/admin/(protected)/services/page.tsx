import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.video.findMany({
    where: { kind: "SERVICE" },
    orderBy: { videoDate: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-brand-900">Services</h1>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-gold-400"
        >
          <Plus size={16} />
          Add service
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {services.length === 0 && <p className="text-brand-800/60">No services yet.</p>}
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-xl border border-brand-900/10 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-brand-900">{service.titleEn}</p>
              <p className="text-sm text-brand-800/60">
                {service.preacher ?? "—"} · {service.videoDate.toLocaleDateString()} ·{" "}
                {service.youtubeId}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="rounded-full border border-brand-900/15 p-2 text-brand-800 hover:bg-brand-50"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
                <button
                  type="submit"
                  className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export function MainFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Colonne marque */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="AfricaShowbizRoom"
                width={50}
                height={50}
                className="h-8 w-8 rounded-full object-contain"
              />
             
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              La plateforme digitale premium qui connecte les talents africains
              et les grandes marques internationales.
            </p>
          </div>

          {/* Plateforme */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Plateforme
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <Link href="/talents" className="transition-colors hover:text-white">
                  Talents
                </Link>
              </li>
              <li>
                <Link href="/networking" className="transition-colors hover:text-white">
                  Mentorat
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition-colors hover:text-white">
                  Opportunités
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="transition-colors hover:text-white">
                  Média Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Entreprise
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Légal
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} AfricaShowbizRoom. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

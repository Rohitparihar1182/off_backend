import { randomUUID } from "crypto";
import Link from "next/link";
import { createId } from '@paralleldrive/cuid2';

type SidebarLinkType = {
    label: string,
    href: string
}

const SidebarLinks = ({ links }: { links: SidebarLinkType[]}) => {
	return (
		<ul className="nav flex-col flex flex-wrap ps-0 mb-0 ms-2">
			{links.map(link => (
                <li className="nav-item relative block" key={createId()}>
				<Link
					href={link.href}
                    target={link.label === "/images/new" ? "_blank" : "_self"}

					className="text-slate-300 hover:text-slate-200 rounded-md flex px-3 py-3 "
				>
					{link.label}
				</Link>
			</li>
            ))}
		</ul>
	);
};

export default SidebarLinks;

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Loading = () => {
	return (
		<main className="p-4">
			<div className="mt-4 flex justify-between items-center">
				<div>
					<h4 className="font-bold text-2xl dark:text-white">
						Blog
					</h4>
				</div>
				<div>
					<Button>
						<Link href={"/blog/new"}>Add Blog</Link>
					</Button>
				</div>
			</div>
			<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{Array(5).map(() => (
					<div className="flex flex-col space-y-3">
						<Skeleton className="h-[250px] w-full rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Loading;

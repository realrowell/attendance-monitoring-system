import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/components/ui/button";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col gap-5 w-100 items-center justify-center h-[100vh] align-middle">
                <div className="text-3xl text-center">Welcome to Bioseed Attendance Monitoring System.</div>
                <Button className="text-xl pt-7 pb-7 ps-10 pe-10"><Link href="login" >Login</Link></Button>
            </div>
        </>
    );
}

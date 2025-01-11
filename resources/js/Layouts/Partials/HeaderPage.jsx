
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi";
import { Link } from "@inertiajs/react";
export default function({header,breadcrumbs = []}){
    return (
        <div className="text-base-800 dark:text-base-200 py-4 mb-2">
            <div className="text-2xl mb-1 font-semibold">{header}</div>
            {/* <Breadcrumb aria-label="Default breadcrumb example">
                <Link href={route('dashboard')} ><Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item></Link>
                
                {
                    breadcrumbs.map((item, key) => (
                        
                        // <Breadcrumb.Item key={key}  {...(item.link ? { href: item.link } : {})}> {item.name}</Breadcrumb.Item>
                        <Link key={key}  {...(item.link ? { href: item.link } : {})}><Breadcrumb.Item >{item.name}</Breadcrumb.Item></Link>
                    ))
                }
            </Breadcrumb> */}
        </div>
    )
}
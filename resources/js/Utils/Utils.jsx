import { router,usePage } from "@inertiajs/react"

export function urlPrevious() {
    const {urlPrevious} = usePage().props
    return urlPrevious
}
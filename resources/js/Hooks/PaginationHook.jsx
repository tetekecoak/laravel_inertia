import { router, usePage } from '@inertiajs/react';
import { Pagination } from 'flowbite-react'; // Assuming you're using Flowbite for pagination UI

const usePagination = (paginate = {}, reloadSections = []) => {

    const handlePagination = (pageNumber) => {
        // Reload the page with the selected page number
        router.reload({
            data: { page: pageNumber },
            only: reloadSections,
            onFinish: () => {
                window.scrollTo(0, 0); 
            } 
        });

    };

    // Define the pagination component
    const PaginationComponent = () => (
        <Pagination
            currentPage={paginate.current_page}
            totalPages={paginate.last_page}
            onPageChange={handlePagination}  // Handle page change
            showIcons
        />
    );

    return {
        PaginationComponent
    };
};

export default usePagination;

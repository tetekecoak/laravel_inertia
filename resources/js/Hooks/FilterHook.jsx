import { useState } from 'react';
import { router,usePage } from '@inertiajs/react';

const useFilter = (reloadSections = []) => {
    const page= usePage().props
    const [filter, setFilter] = useState(page.query);
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleFilter = (label , e) => {

        setFilter(prevFilter => ({
            ...prevFilter,    // Keep the previous filter properties
            [label]: e    // Add/Update the specific label with the given value
        }));

        // Clear existing timer if any
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new timer for debounced API call
        const timer = setTimeout(() => {
            // Trigger the Inertia reload with the search query
            router.reload({
                data:  { ...filter,  [label]: e , page : 1 },
                only: reloadSections,  // Dynamically pass the sections to reload
            });
        }, 500);

        // Set the new debounce timer
        setDebounceTimer(timer);
    };

    return {
        filter,
        handleFilter,
    };
};

export default useFilter;

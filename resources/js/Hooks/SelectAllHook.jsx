import { useState, useEffect } from 'react';

// Custom hook to manage checkbox list with select-all functionality
const useSelectAll = (initialItems = []) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(initialItems.map(item => item.id)); // assuming items have 'id' as a unique identifier
    } else {
      setSelectedItems([]);
    }
    console.log("oke")
  }, [selectAll,initialItems]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedItems.includes(id);

  return {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleCheckboxChange,
    isSelected
  };
};


export {useSelectAll};

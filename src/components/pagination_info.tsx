
interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function PaginationInfo({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationInfoProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="text-sm text-gray-700">
      Affichage de {start} à {end} sur {totalItems} entrées | Page {currentPage} sur {totalPages}
    </div>
  );
}

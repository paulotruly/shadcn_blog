import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (currentPage === 1) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages]
  }
  if (currentPage === 2) {
    return [1, 2, 3, "ellipsis", totalPages - 1, totalPages]
  }
  if (currentPage === totalPages - 1) {
    return [currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1]
  }
  if (currentPage === totalPages) {
    return [currentPage -4, currentPage - 3, currentPage - 2, currentPage - 1, currentPage]
  }
  return [currentPage - 2, currentPage - 1, currentPage, "ellipsis", totalPages - 1, totalPages]
}

export default function PaginationComponent({
  currentPage, 
  totalPages,
  onPageChange,
}: PaginationProps) {

const pages = getPageNumbers(currentPage, totalPages)

  return (
    <Pagination className="text-slate-400">
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
            href="#"
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (

              <PaginationLink
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page as number)
                }}
                isActive={page === currentPage}
                href="#"
              >

                {page}

              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1)
              }
            }}
            href="#"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

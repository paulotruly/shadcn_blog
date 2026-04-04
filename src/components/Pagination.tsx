import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "@tanstack/react-router"

interface PaginationProps {
  currentPage: number
  totalPages: number
  route?: string
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 1) {
    return []
  }
  
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages]
  }
  
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
}


export default function PaginationComponent({
  currentPage, 
  totalPages,
  route = '/',
}: PaginationProps) {

  const navigate = useRouter()
  const pages = getPageNumbers(currentPage, totalPages)

  const goToPage = (page: number) => {
    navigate.navigate({to: route, search: {page}})
  }

  if (pages.length === 0) {
    return null
  }

  return (
    <Pagination className="text-slate-400">
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                goToPage(currentPage - 1)
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
                  goToPage(page as number)
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
                goToPage(currentPage + 1)
              }
            }}
            href="#"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

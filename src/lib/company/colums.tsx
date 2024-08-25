

import { Badge } from "@/components/ui/badge";
import { ActionCell } from "@/components/ui/companies/actions_cell";
import { ColumnDef } from "@tanstack/react-table";
import { CompanyDataTableType } from "./company_types";



export const columns: ColumnDef<CompanyDataTableType>[] = [
  {
    accessorKey: "companyName",
    header: "Nom de l'entreprise",
  },
  {
    accessorKey: "firstNames",
    header: "Prénom(s)",
  },
  {
    accessorKey: "lastName",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={
            status === 'ACCEPTED' ? 'success' :
            status === 'REJECTED' ? 'destructive' :
            status === 'PENDING' ? 'warning' :
            'secondary'
          }>
            {status}
          </Badge>
        );
      },
    },
  {
    accessorKey: "businessSector.name",
    header: "Secteur d'activité",
  },
  {
    accessorKey: "administrator.name",
    header: "Validateur",
    cell: ({ row }) => row.original.administrator?.name || 'Non assigné',
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
      id: "actions",
      cell: ({ row }) => <ActionCell company={row.original} />,
    },
]

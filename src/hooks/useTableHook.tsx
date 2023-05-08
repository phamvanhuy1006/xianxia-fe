import { Checkbox } from '@mui/material'
import { CellProps, HeaderProps, Hooks, usePagination, useRowSelect, useSortBy } from 'react-table'
import { ActionColumnConfig, OriginalRowType } from 'src/components/ReactTable/Table'
import TableAction from 'src/components/ReactTable/components/TableAction'

function selectionHook<T extends object>(enabled: boolean) {
  return (hooks: Hooks<T>) => {
    if (!enabled) return
    hooks.allColumns.push((columns) => [
      {
        id: '_selector',
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...getToggleAllRowsSelectedProps()}
          />
        ),
        Cell: ({ row }: CellProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...row.getToggleRowSelectedProps()}
          />
        )
      },
      ...columns
    ])
  }
}

export type ActionHookArgs<T extends object> = {
  actionConfig?: ActionColumnConfig
  onActionEdit?(props: OriginalRowType): void
  onActionDelete?(props: OriginalRowType): void
  defaultActionEdit?: boolean
}

function actionHook<T extends object>({
  actionConfig,
  onActionDelete,
  onActionEdit,
  defaultActionEdit
}: ActionHookArgs<T>) {
  return (hooks: Hooks<T>) => {
    if (!(onActionDelete || onActionEdit || defaultActionEdit)) return
    hooks.allColumns.push((columns) => [
      ...columns,
      {
        id: '__action',
        Cell: (props: CellProps<T>) => (
          <TableAction<T>
            actionConfig={actionConfig}
            onActionEdit={onActionEdit}
            onActionDelete={onActionDelete}
            defaultActionEdit={defaultActionEdit}
            {...props}
          />
        )
      }
    ])
  }
}

const hooks = [useSortBy, usePagination, useRowSelect]

export { hooks, selectionHook, actionHook }

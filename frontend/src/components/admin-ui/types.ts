export interface AdminSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface AdminTableColumnConfig {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean | 'left' | 'right'
}

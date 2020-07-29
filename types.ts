import { TPriceRangesFilter } from '../../../store/reducers/goods/typesData'

export interface IListFilter {
  filterName: string
  label: string
  data: { id: number; name?: string; value?: string }[] | null
  ids: { id: number }[]
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}
export interface IListFilterRange {
  filterName: string
  label: string
  ranges?: TPriceRangesFilter[] | null
  data: { max: number; min: number } | null
  safe: { max: number; min: number } | undefined
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  mousing(triggering: boolean): void
  onChangeRange(range: TPriceRangesFilter): void
}

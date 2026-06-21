import type {
  BranchService,
  Breadcrumb,
  CustomerType,
  JobStatus,
  JobType,
  Marketplace,
  PageItem,
  PartCategory,
  Supplier,
  Ticket,
  User,
} from '@/types/model'
import type { TableSortOption } from '@/stores/table.store.ts'
import type { ColorKey } from '@/types/tailwind'
import type { FormTicketList } from '@/components/form/FormTicket.vue'
import type { FormPartList } from '@/components/form/FormPart.vue'
import type { FormStockList } from '@/components/form/FormStock.vue'
import type { FormSaleList, SaleFeeList } from '@/components/form/FormSale.vue'
import type { Component } from 'vue'
import type { FormAccountItemList } from '@/components/form/FormAccountItem.vue'

export const availableThemes = ['light', 'dark'] as const
export type ThemeKey = (typeof availableThemes)[number]

export type VariantType = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
export type ModalStatus = 'success' | 'error' | 'none' | 'confirm'
export type PositionXType = 'left' | 'center' | 'right'

export interface HomeWidget {
  value: number
  target: number
  maxRates?: number
}

export interface ResultDataDiv {
  div: number
  value: number
}

export interface ResultData {
  sabbr: ResultDataDiv
  speedRepair: ResultDataDiv
  income: ResultDataDiv
  incentive: number
}

export interface ResAxios<T = unknown> {
  data: ParseData<T>
}

export interface InputLabelValue {
  label: string
  value: string | number
  id?: number
  code?: string
  name?: string
  icon?: string
  color?: ColorKey
  image?: string
}

export interface TablePagination {
  label: string
  url: string | null
  active: boolean
}

export interface TableData<T = unknown> {
  columns?: TableHeaderColumn[] | null
  data?: T[]
  links?: TablePagination[]
  pagination?: TablePagination[]
  total?: number
}

export interface TableHeaderColumn {
  title: string
  column?: string
  sort?: TableSortOption
  sortable?: boolean
}

export interface TableParseData {
  header?: TableHeaderColumn[]
}

export interface ContentData {
  title: string
  desc: string
  breadcrumbs?: Breadcrumb[]
  sub_pages?: PageItem[] | null
  table?: TableParseData | null
}

export interface ParseData<T> {
  status?: ModalStatus
  message?: string
  errors?: Record<string, string[]>
  data?: T | TableData<T> | null
  content?: ContentData | null
  customer_types?: CustomerType[] | null
  customerTypeLists?: InputLabelValue[] | null
  ticketLists?: FormTicketList
  jobLists?: FormTicketList
  partLists?: FormPartList
  stockLists?: FormStockList
  saleLists?: FormSaleList
  accountItemLists?: FormAccountItemList
  branch_services?: BranchService[] | null
  job_types?: JobType[] | null
  job_states?: JobStatus[] | null
  user?: User
  categories?: string[] | PartCategory[] | InputLabelValue[] | null
  branches?: InputLabelValue[]
  ticket?: Ticket
  suppliers?: Supplier[]
  deliveries?: Delivery[]
  marketplaces?: Marketplace[]
  fee_names?: SaleFeeList[]
}

export interface SendData<T> {
  status: 'error' | 'success'
  data: T | Record<string, string[]>
}

export interface SidebarMenuButton {
  icon: string
  name: string
  url: string
  component?: Component
}

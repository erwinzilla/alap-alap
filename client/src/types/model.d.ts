import type { ColorKey } from '@/types/tailwind'

type BooleanNumber = 0 | 1

export interface User {
  id: number
  name: string
  email: string
  pages?: Menubar[]
  configs: Config
}

export interface Stock {
  id?: number
  name?: string
  ref?: string | null
  type?: number
  disc?: number
  note?: string | null
  cancel?: boolean
  supplier?: number | null
  suppliers?: Supplier | null
  invoice?: number | null
  invoices?: Invoice | null
  bill?: number | null
  bills?: Bill | null
  items?: StockItem[]
  created_at?: string
  updated_at?: string
  cancelled?: boolean
  total?: number
  total_paid?: number
  status?: string
  status_color?: ColorKey
}

export interface StockItem {
  id?: number
  sku?: string
  name?: string
  price?: number
  qty?: number
  qty_real?: number
  stock?: number
  part?: number
  parts?: Part
  pick?: number
  stocks?: Stock | null
  status?: string
  status_color?: ColorKey
}

export interface Invoice {
  id?: number
  name?: string
  paid?: number
  paid_at?: string
  tax_rate?: number
  items?: InvoiceItem[]
  job?: number | null
  account_item?: number | null
  account_items?: AccountItem | null
  sub_total?: number
  tax_amount?: number
  grand_total?: number
  deleted_at?: string | null
  stock?: number
}

export interface InvoiceItem {
  id?: number
  invoice?: number
  invoices?: Invoice
  item?: string
  desc?: string
  price?: number
  qty?: number
  disc?: number
  total?: number
  grand_total?: number
}

export interface Bill {
  id?: number
  name?: string
  tax_rate?: number
  note?: string
  items?: BillItem[]
  account_item?: number | null
  account_items?: AccountItem | null
  sub_total?: number
  tax_amount?: number
  grand_total?: number
  deleted_at?: string | null
  stock?: number
  paid?: 0 | 1 //false or true
}

export interface BillItem {
  id?: number
  bill?: number
  bills?: Invoice
  item?: string
  desc?: string
  price?: number
  qty?: number
  disc?: number
  total?: number
  grand_total?: number
}

export interface AccountItem {
  id?: number
  name?: string
  amount?: number
  type?: number
  note?: string | null
  category?: number | null
  categories?: AccountItemCategory | null
  account?: number | null
  created_at?: string
  updated_at?: string
}

export interface AccountItemCategory {
  id?: number
  name?: string
  color?: ColorKey
}

export interface Bill {
  deleted_at?: string | null
  account_items?: AccountItem | null
}

export interface Supplier {
  id?: number
  name?: string
  alias?: string
}

export interface Part {
  id?: number
  sku?: string
  name?: string
  price?: number
  price_sell?: number
  loc?: string | null
  note?: string | null
  discontinued_at?: string | null
  category?: number | null
  categories?: PartCategory | null
  cover?: number | null
  covers?: Attachment | null
  substitute?: number | null
  substitutes?: Part | null
  stock?: number
  attachments?: Attachment[] | null
  sales?: PartSale[]
  has_substitutes?: Part[]
  created_at?: string
  updated_at?: string
}

export interface PartCategory {
  id?: number
  name?: string
  color?: ColorKey
  image?: string
}

export interface PartSale {
  id?: number
  name?: string
  desc?: string
  price?: number
  po_day?: number
  active?: BooleanNumber
  stock?: number
  weight?: number
  dimension_p?: number
  dimension_l?: number
  dimension_t?: number
  tags?: string[]
  part?: number | null
  parts?: Part | null
  cover?: number | null
  covers?: Attachment | null
  substitute?: number | null
  substitutes?: PartSale | null
  attachments?: Attachment[]
}

export interface Attachment {
  id?: number
  name?: string
  desc?: string | null
  from?: string | null
  warranty?: number
  customer?: number
  job?: number
  part?: number
  sale?: number
  user?: number
  ticket?: number
  part_sale?: number
  files?: FileList[]
}

export interface PartMoving {
  id?: number
  name?: string
  ref?: string
  ref_desc?: string | null
  from?: string
  from_color?: ColorKey
  parts?: Part | null
  price?: number
  qty?: number
  qty_pick?: number
  qty_consume?: number
  qty_cancel?: number
  note?: string
  job_parts?: JobPart | null
  stock_items?: StockItem | null
  sale_parts?: SalePart | null
}

export interface Sale {
  id?: number
  name?: string
  ref?: string
  note?: string | null
  customer_name?: string
  phone?: string
  address?: string
  customer_type?: number | null
  disc?: number
  delivery_code?: string
  delivery_service?: string
  delivery_price?: number
  delivery_fee?: BooleanNumber
  cancel?: BooleanNumber
  invoice?: number | null
  invoices?: Invoice | null
  delivery?: number | null
  deliveries?: Delivery | null
  marketplace?: number | null
  marketplaces?: Marketplace | null
  created_at?: string
  updated_at?: string
  status?: string
  status_color?: ColorKey
  parts?: SalePart[]
  fees?: SaleFee[]
  total_paid?: number
  cancelled?: boolean
}

export interface SalePart {
  id?: number
  sku?: string
  name?: string
  price?: number
  qty?: number
  qty_real?: number
  part?: number
  parts?: Part
  pick?: number
  sale?: number | null
  sales?: Sale | null
  status?: string
  status_color?: ColorKey
}

export interface SaleFee {
  id?: number
  item?: string
  desc?: string
  price?: number
  sale?: number | null
  sales?: Sale | null
}

export interface Delivery {
  id?: number
  name?: string
  image?: string
}

export interface Marketplace {
  id?: number
  name?: string
  name_fee?: string
  color?: ColorKey
  image?: string
}

export interface Customer {
  id?: number
  name?: string
  phone?: string
  phone2?: string
  phone3?: string
  address?: string
  email?: string
  tax_id?: string
  type?: number | null
}

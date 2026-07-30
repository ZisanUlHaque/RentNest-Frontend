

export type IUser = {
  id: string
  name: string
  email: string
  password: string

  activeStatus: IActiveStatus
  role: IRole

  profilePhoto: string | null
  phone: string

  rentalRequests?: IRentalRequest[]
  properties?: IProperty[]
  payments?: IPayment[]
  reviews?: IReview[]

  _count?: {
    rentalRequests: number
    properties: number
    payments: number
    reviews: number
  }

  createdAt: string
  updatedAt: string
}

export type IUserResponse =
  | {
      success: true
      data: {
        profile: IUser
      }
    }
  | {
      success: false
      data: null
      message?: string
    }

export type NavbarProps = {
  user: IUserResponse
}

export type ICategory = {
  id: string
  name: string
  description: string | null

  properties?: IProperty[]

  _count?: {
    properties: number
  }

  createdAt: string
  updatedAt: string
}

export type IReview = {
  id: string
  propertyId: string
  tenantId: string
  rentalRequestId: string
  rating: number
  comment: string | null

  property?: IProperty
  tenant?: IUser
  rentalRequest?: IRentalRequest

  createdAt: string
}

export type IProperty = {
  id: string
  title: string
  description: string
  rentPerMonth: number
  location: string
  amenities: string[]
  images: string[]
  status: IPropertyStatus

  landlordId: string
  landlord?: IUser

  categoryId: string
  category?: ICategory

  rentalRequests?: IRentalRequest[]
  reviews?: IReview[]

  _count?: {
    rentalRequests: number
    reviews: number
  }

  createdAt: string
  updatedAt: string
}

export type IActiveStatus = "ACTIVE" | "BANNED"

export type IRole = "TENANT" | "LANDLORD" | "ADMIN"

export type IPropertyStatus = "AVAILABLE" | "PENDING" | "RENTED"

export type IRentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "PAYMENT_PENDING"
  | "ACTIVE"
  | "COMPLETED"

export type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED"

export type IRentalRequest = {
  id: string
  moveInDate: string
  durationMonths: number
  message: string | null
  status: IRentalRequestStatus

  propertyId: string
  property?: IProperty

  tenantId: string
  tenant?: IUser

  payment?: IPayment
  review?: IReview

  createdAt: string
  updatedAt: string
}

export type IPayment = {
  id: string
  rentalRequestId: string
  tenantId: string

  amount: number
  currency: string

  stripePaymentIntentId: string | null
  stripeCheckoutSessionId: string | null
  stripeClientSecret: string | null

  status: IPaymentStatus
  paidAt: string | null
  createdAt: string

  rentalRequest?: IRentalRequest
  tenant?: IUser
}

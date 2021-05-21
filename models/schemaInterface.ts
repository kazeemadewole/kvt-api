export  interface UserInterface {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    location: string
    tokens: {token: string}[]
    occupation: string
    role: string
}

export interface ProductInterface {
    title: string 
      description: string
      productImage: {imageUrl:string}[]
      userId: string
      price: number
      contact: string
      location: string
      status: string
      createdAt?:Date
}

export interface CategoryInterface {
    category: string
}

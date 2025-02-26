export interface Product {
  _id: string;
  title: string;
  price: string;
  image: string;
  stock: number;
  description: string | TrustedHTML;
  __html: string | TrustedHTML;
}

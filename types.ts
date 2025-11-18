// export type EventItem = {
//   id: string;
//   title: string;
//   image: string;
//   venue: string;
//   city: string;
//   dateISO: string;    // ISO string
//   price?: string;     // undefined = “Free”
//   rating?: number;    // 0..5
//   description?: string;
//   externalLink?: string;
// };

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  description: string;
  link: string;
  image?: string;
};
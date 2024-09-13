export type RegisterFormData = {
    companyName: String;
    services: string;
    city: string;
    state:string;
    contact:string;
    email: string;
    password: string;
    companyDescription:string;
  }

export type ImageItemProps={
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}
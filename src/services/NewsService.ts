import { get, patch, post } from "./ApiService";

const mainRoute = "/api/news";

export const allCountries = async () => {
  try {
    const response = await get(`${mainRoute}/allCountries`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const allCategories = async () => {
  try {
    const response = await get(`${mainRoute}/allCategories`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {  
    // Do Nothing
  }

  return null;
};

export const articles = async (form: {[key:string]: boolean|string|string[]|null|undefined}) => {
  try {
    const payload = {...form};
    const response = await post(`${mainRoute}/articles`, payload);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    // Do Nothing
  }

  return null;
};

export const sources = async () => {
  try {
    const response = await post(`${mainRoute}/sources`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    // Do Nothing
  }

  return null;
};

export const homeArticles = async (page?: string|null) => {
  let form = {'category': ['top']};
  if (page) {
    form = {...form, ...{'page': page}};
  }

  return await articles(form);
};

export const categoryArticles = async (category: string[], page?: string|null) => {
  let form = {'category': category};
  if (page) {
    form = {...form, ...{'page': page}};
  }
  
  return await articles(form);
};

export const localArticles = async (category: string[], country: string, page?: string|null) => {
  let form = {'category': category, 'country': country};
  if (page) {
    form = {...form, ...{'page': page}};
  }
  
  return await articles(form);
};

export const searchArticles = async (query: string, category: string[], country: string, page?: string|null, title?: boolean) => {
  let form = {'category': category, 'country': country};
  if (title === true) {
    form = {...form, ...{'qInTitle': query}};
  } else {
    form = {...form, ...{'q': query}};
  }
  if (page) {
    form = {...form, ...{'page': page}};
  }
  
  return await articles(form);
};
import * as contentful from 'contentful';

if (!import.meta.env.CONTENTFUL_SPACE_ID || !import.meta.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables must be defined');
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Product>({
        content_type: 'product',
        order: 'fields.productName',
        include: 2,
      });
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    if (!slug) return null;

    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Product>({
        content_type: 'product',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });
    });

    if (!entries.items.length) {
      console.warn(`No product found with slug: ${slug}`);
      return null;
    }

    return entries.items[0];
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

export interface Author {
  fields: {
    name: string;
    avatar?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface Variant {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    product: Product;
    width: number;
    aspectRatio: number;
    rimSize: number;
    loadspeedIndex: string;
    tireType: string[];
    seasonUsage: string[];
    line?: string;
    price?: number;
    stock: number;
    variantImage?: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
    variantTechnicalSheet?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface Product {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    productName: string;
    brand: string[];
    model: string;
    category: string[];
    slug: string;
    isFeatured?: boolean;
    description: string;
    mainImage: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
    technicalSheet?: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
    notes?: string;
    variants?: Variant[];
  };
}

export interface RichImage {
  fields: {
    internalName: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    caption?: string;
    fullWidth?: boolean;
  };
}

export interface Seo {
  fields: {
    pageTitle: string;
    pageDescription: string;
    canonicalUrl?: string;
    nofollow?: boolean;
    noindex?: boolean;
    shareImages?: {
      fields: {
        file: {
          url: string;
        };
      };
    }[];
  };
}

export interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    slug: string;
    author: Author;
    publishedDate: string;
    title: string;
    subtitle: string;
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    content: any;
    relatedBlogPosts?: {
      fields: BlogPost['fields'];
    }[];
    seoFields: Seo;
  };
}

export async function getAllBlogPosts() {
  try {
    const cacheKey = 'blog-posts';
    let entries;
    
    // Intentar obtener del cache primero
    if (import.meta.env.PROD) {
      entries = await contentfulClient.getEntries<BlogPost>({
        content_type: 'pageBlogPost',
        order: '-fields.publishedDate',
        limit: 1000,
      });
    } else {
      entries = await fetchWithRetry(async () => {
        return await contentfulClient.getEntries<BlogPost>({
          content_type: 'pageBlogPost',
          order: '-fields.publishedDate',
        });
      });
    }
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    if (!slug) return null;
    
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<BlogPost>({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
        limit: 1,
        include: 2 // Incluir contenido anidado
      });
    });

    if (!entries.items.length) {
      console.warn(`No post found with slug: ${slug}`);
      return null;
    }

    return entries.items[0];
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export interface Service {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: any;
    icon?: string[];
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    galleryImages?: {
      fields: {
        file: {
          url: string;
        };
      };
    }[];
    benefits: string[];
    availableLocations?: string[];
    serviceOrder: number;
    serviceStation?: Array<{
      sys: { id: string; type: string; }; // Puedes definir una interfaz Service si tienes el modelo
      fields: {
        name: string;
        // Agrega aquí otros campos relevantes de la entrada de servicio
      };
    }>;
    seoMetadata?: {
      sys: {
        id: string;
      };
      fields: any;
    };
  };
}

export interface Promotion {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    description: any;
    image?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export async function getAllServices() {
  try {
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Service>({
        content_type: 'services',
        order: 'sys.createdAt',
        include: 2
      });
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    if (!slug) return null;
    
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Service>({
        content_type: 'services',
        'fields.slug': slug,
        limit: 1,
        include: 2
      });
    });

    if (!entries.items.length) {
      console.warn(`No service found with slug: ${slug}`);
      return null;
    }

    return entries.items[0];
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

export interface Tire {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    slug: string;
    title: string;
    brand: {
      fields: {
        name: string;
      };
    };
    design: string;
    shortDescription?: string;
    longDescription: any;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    rin?: string[];
    size?: string[];
    seoMetadata?: {
      fields: {
        pageTitle: string;
        pageDescription: string;
      };
    };
  };
}

export async function getAllTires() {
  try {
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Tire>({
        content_type: 'tires',
        order: 'sys.createdAt',
        include: 2
      });
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching tires:', error);
    return [];
  }
}

export async function getTireBySlug(slug: string) {
  try {
    if (!slug) return null;
    
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<Tire>({
        content_type: 'tires',
        'fields.slug': slug,
        limit: 1,
        include: 2
      });
    });

    if (!entries.items.length) {
      console.warn(`No tire found with slug: ${slug}`);
      return null;
    }

    return entries.items[0];
  } catch (error) {
    console.error(`Error fetching tire with slug ${slug}:`, error);
    return null;
  }
}

export interface ServiceStation {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    address: string;
    phone?: string;
    ext?: string;
    mobile?: string;
    region?: string[];
    map?:string;
    description: any; // RichText JSON (puedes importar Document de '@contentful/rich-text-types' si lo deseas)
    schedule: any; // RichText JSON
    services: Array<{
      sys: { id: string; type: string; }; // Puedes definir una interfaz Service si tienes el modelo
      fields: {
        name: string;
        // Agrega aquí otros campos relevantes de la entrada de servicio
      };
    }>;
    orden: string;
  };
}


export async function getServiceStationBySlug(slug: string) {
  try {
    if (!slug) return null;
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<ServiceStation>({
        content_type: 'serviceStation',
        'fields.slug': slug,
        limit: 1,
        include: 1
      });
    });
    if (!entries.items.length) {
      console.warn(`No service station found with slug: ${slug}`);
      return null;
    }
    return entries.items[0];
  } catch (error) {
    console.error(`Error fetching service station with slug ${slug}:`, error);
    return null;
  }
}

export async function getAllServiceStations() {
  try {
    const entries = await fetchWithRetry(async () => {
      return await contentfulClient.getEntries<ServiceStation>({
        content_type: 'serviceStation',
        order: 'fields.orden',
        include: 1
      });
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching service stations:', error);
    return [];
  }
}

export async function getAllPromotions() {
  try {
    const entries = await contentfulClient.getEntries<Promotion>({
      content_type: 'promotions',
      order: 'sys.createdAt',
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return [];
  }
}
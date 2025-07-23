// Base Contentstack entry type with metadata
export type TContentstackEntry = {
  uid: string;
  locale?: string;
  _version?: number;
  _in_progress?: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  ACL?: Record<string, any>;
  tags?: string[];
  _content_type_uid?: string;
  publish_details?: {
    time: string;
    user: string;
    environment: string;
    locale: string;
  };
  title?: string;
  $?: Record<string, any>; // Live Preview edit tags
  _metadata?: Record<string, any>;
  [key: string]: any; // Allow additional fields
};

export type THeaderData = TContentstackEntry & {
  website_title: string;
  logo: {
    url: string;
  };
  navigation_links: {
    link: {
      href: string;
      title: string;
    }[];
  };
};

export type TFooterData = TContentstackEntry & {
  title: string;

  navigation_links?: {
    title?: string;
    link?: TLink[];
  };

  information_section?: {
    logo?: {
      url?: string;
    };
    descrption?: string;
    timings?: string;
    holiday?: string;
  };

  copyright?: string;
};

export type THomePageData = TContentstackEntry & {
  sections: {
    home: {
      hero_section?: {
        banner?: {
          url: string;
        };
        heading?: string;
        description?: string;
        primary_cta?: string;
      };
    };
  }[];
};

export type TLink = {
  href: string;
  title: string;
};

//COMMENT: Uncomment below lines

export type TDishes = TContentstackEntry & {
  image: {
    url: string;
  };
  title: string;
  description: string;
  price: number;
};

export type TMenu = TContentstackEntry & {
  course_name: string;
  dishes: TDishes[];
};


export interface UserFeed {
    userId: string;
    feedId: string;
    view: number;
    category: string | null;
    title: string | null;
    isPrivate: boolean;
    feeds: FeedDetails;
}

export interface FeedDetails {
    id: string;
    url: string;
    title: string;
    type: string;
    description: string | null;
    siteUrl: string;
    image: string | null;
    etagHeader: string | null;
    errorMessage: string | null;
    errorAt: string | null;
    ownerUserId: string | null;
    owner: string | null;
}

export interface Category {
  category: string | null
  feeds: FeedDetails[]
}

export interface ViewGroup {
  view: number
  categories: Category[]
}

export type ViewCategoryFeedMap = {
    [view: number]: {
        categories: {
            [category: string]: FeedDetails[];
        };
        unGroupedFeeds?: FeedDetails[];
    };
}

export type ResultItem = {
    view: number;
    categories: {
        category: string;
        feeds: FeedDetails[];
    }[];
    unGroupedFeeds: FeedDetails[];
}

export const ViewNameList = ["文章", "社交媒体", "图片", "视频", "音频", "通知"]
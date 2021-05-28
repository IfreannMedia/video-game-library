export interface Game {
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genre: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publisher>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshot>;
    trailers: Array<Trailer>;
}

export interface ApiResponse<T> {
    results: Array<T>
}

interface Genre {
    platform: {
        name: string;
    };
}

interface Publisher {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}

interface Screenshot {
    image: string;
}

interface Trailer {
    data: {
        max: string;
    };
}

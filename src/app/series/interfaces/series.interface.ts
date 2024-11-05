export interface Serie {
  id: number;
  name: string;
  streaming: StreamingPlataform;
  personalRating: number;
  ratings: Rating[];
  synopsis: string;
  alt_img?: string;
  averageRating?: number;
}

export interface Rating {
  fullName: string;
  email: string;
  rating: number;
  id: number;
}

export enum StreamingPlataform {
  Netflix = 'Netflix',
  Prime = 'Amazon Prime Video',
  Disney = 'Disney+',
  Hbo = 'HBO Max',
  Hulu = 'Hulu',
  Apple = 'Apple TV+',
  Paramount = 'Paramount+',
  Peacock = 'Peacock',
  Crunchyroll = 'Crunchyroll',
  Starz = 'Starz',
  Otras = 'Otras',
}

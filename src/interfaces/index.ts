import React from 'react';

export interface WisdomInterface {
  id: number;
  image: string;
  title: string;
}

export interface ActionInterface {
  type: string;
  payload: any;
}

export interface LinkInterface {
  to: string;
  children: React.ReactNode;
  blank: boolean;
}

export interface TextComponentInterface {
  message: string;
  classes: string;
}

export interface StoreInterface {
  wisdoms: WisdomInterface[];
  firstWisdomId: string | null;
  wisdomsMap: {
    prev: WisdomInterface | null;
    current: WisdomInterface | null;
    next: WisdomInterface | null;
  };
  isLoading: boolean;
  steps: number;
  shouldRedirect: boolean;
  homePageMessages: {
    [key: number]: string;
  };
}

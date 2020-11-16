export abstract class LoadingState {
  isLoading: boolean;
}

export abstract class EntityLoadingState<T> extends LoadingState {
  entity?: T;
}

export abstract class ItemsLoadingState<T> extends LoadingState {
  items?: T[];
}

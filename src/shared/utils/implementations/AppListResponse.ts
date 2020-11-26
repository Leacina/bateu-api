class ListResponse {
  public readonly hasNext: boolean;

  public readonly items: number;

  public readonly page: number;

  public readonly pageSize: number;

  constructor(items: any, page: number, pageSize: number) {
    this.hasNext = items.length > pageSize;

    if (items.length > 1 && this.hasNext) {
      items.pop();
    }

    this.items = items;
    this.page = page || 1;
    this.pageSize = pageSize || 10;
  }
}

export default ListResponse;

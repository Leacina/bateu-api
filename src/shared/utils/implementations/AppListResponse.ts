class ListResponse {
  public readonly hasnext: boolean;

  public readonly items: number;

  public readonly page: number;

  public readonly pagesize: number;

  constructor(items: any, page: number, pagesize: number) {
    this.hasnext = items.length > pagesize;

    items.pop();
    this.items = items;
    this.page = page || 1;
    this.pagesize = pagesize || 10;
  }
}

export default ListResponse;

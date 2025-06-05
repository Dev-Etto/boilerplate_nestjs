export class PaginationResultDto<T> {
  nodes: T[];
  count: number;
  page: number;
  pageSize: number;

  constructor(nodes: T[], count: number, page: number, pageSize: number) {
    this.nodes = nodes;
    this.count = count;
    this.page = page;
    this.pageSize = pageSize;
  }
}

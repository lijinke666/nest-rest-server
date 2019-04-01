declare interface IPaginationResponse<T = {}> {
  resource: T,
  total?: number
}

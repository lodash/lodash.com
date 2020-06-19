interface IMethodParam {
  name: string
  type: string
  desc: string
}

export interface IMethod {
  node: {
    aliases: string[]
    call: string
    category: string
    desc: string
    example: string
    id: string
    name: string
    params: IMethodParam[]
    since: string
    lineNumber: number
  }
}

export interface IGroup {
  edges: IMethod[]
  field: string
  fieldValue: string
  totalCount: number
}

export interface IAllLodashMethodQuery {
  allLodashMethod: {
    group: IGroup[]
  }
}

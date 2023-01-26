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
    returns: string[]
    since: string
    lineNumber: number
    version: string
  }
}

export type IMethodNode = IMethod["node"]

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

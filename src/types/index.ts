interface MethodParam {
  name: string
  type: string
  desc: string
}

export interface Method {
  node: {
    aliases: string[]
    call: string
    category: string
    desc: string
    example: string
    id: string
    name: string
    params: MethodParam[]
    since: string
  }
}

export interface Group {
  edges: Method[]
  field: string
  fieldValue: string
  totalCount: number
}

export interface AllLodashMethodQuery {
  allLodashMethod: {
    group: Group[]
  }
}

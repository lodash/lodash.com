import { IMethod, IGroup } from "../types"

function filterMethod(method: IMethod, input: string, version: string): boolean {
  return (
    method.node.name.toLowerCase().includes(input.toLowerCase()) && method.node.version === version
  )
}

function filterMethods(methods: IMethod[], input: string, version: string): IMethod[] {
  return methods.filter((method) => filterMethod(method, input, version))
}

export function filterGroups(groups: IGroup[], input: string, version: string): IGroup[] {
  return groups
    .map((group) => {
      return {
        ...group,
        edges: group.edges.filter((method) => filterMethod(method, input, version)),
      }
    })
    .filter(({ edges: groupMethods }) => {
      return filterMethods(groupMethods, input, version).length
    })
}

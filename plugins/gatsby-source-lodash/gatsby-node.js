"use strict"

const fetch = require("node-fetch")
const _ = require("lodash")
const Entry = require("./lib/entry.js")
const getEntries = Entry.getEntries

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // TODO: Extend this to include multiple versions
  const url = configOptions.versions[0].url
  const version = configOptions.versions[0].version

  const processEntry = entry => {
    try {
      // Exit early if the entry is private or has no name
      if (!entry || !entry.getName() || entry.isPrivate()) {
        return
      }
    } catch (err) {
      // Some of the non-lodash methods were throwing a hard to trace error
      // from the lib code. Rather than trace back, it was easier to catch
      // since they aren't part of lodash.
      return
    }

    // Special handling of aliases to get call names. Without this, there are
    // circular JS object references.
    const aliases = entry.getAliases().map(alias => {
      const member = entry.getMembers(0) || ""
      const name = alias.getName()
      return `${member}.${name}`
    })

    const params = entry
      .getParams()
      .map(([type, name, desc]) => ({ type, name, desc }))

    const entryData = {
      aliases,
      call: entry.getCall(),
      category: entry.getCategory(),
      desc: entry.getDesc(),
      example: entry.getExample(),
      hash: entry.getHash(),
      isAlias: entry.isAlias(),
      isCtor: entry.isCtor(),
      isFunction: entry.isFunction(),
      isLicense: entry.isLicense(),
      isPlugin: entry.isPlugin(),
      isStatic: entry.isStatic(),
      lineNumber: entry.getLineNumber(),
      members: entry.getMembers(),
      name: entry.getName(),
      params,
      related: entry.getRelated(),
      returns: entry.getReturns(),
      since: entry.getSince(),
      type: entry.getType(),
      version,
    }

    const nodeData = {
      ...entryData,
      children: [],
      id: createNodeId(
        `lodash_method_${version}_${entryData.hash}_${entryData.lineNumber}`
      ),
      internal: {
        content: JSON.stringify(entryData),
        contentDigest: createContentDigest(JSON.stringify(entryData)),
        type: "LodashMethod",
      },
      parent: null,
    }

    return nodeData
  }

  return fetch(url)
    .then(res => res.text())
    .then(body => {
      const entries = getEntries(body)

      // For each entry, create node.
      _.each(entries, entry => {
        entry = new Entry(entry, body)
        const nodeData = processEntry(entry)
        if (nodeData) {
          createNode(nodeData)
        }
      })
    })
}

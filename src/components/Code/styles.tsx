import styled from "styled-components"

export const CodeWrapper = styled.div`
  margin: 32px 0;
  padding: 32px 0;
  background: #1f2a34;
  font-size: 16px;

  /* Note: forked from An Old Hope style, could use work */
  .hljs-comment,
  .hljs-quote {
    color: #7890a5;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #f1e92c;
  }

  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #a5beff;
  }

  .hljs-attribute {
    color: #ee7c2b;
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #ff5858;
  }

  .hljs-title,
  .hljs-section {
    color: #78bb65;
  }

  .hljs-keyword,
  .hljs-selector-tag {
    color: #f1e92c;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    color: #ddd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs.html .hljs-tag {
    color: #ddd;
  }
`

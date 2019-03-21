import { Link } from "gatsby"
import { lighten } from "polished"
import React from "react"
import styled from "styled-components"
import Code from "./Code"

interface MethodProps {
  name: string
}

const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #293845;
  padding: 11px 11px 24px;

  & + & {
    margin-top: 75px;
  }
`

const Name = styled.h2`
  display: flex;
  align-items: center;
  background: #171f26;
  border-radius: 3px;
  font-size: 24px;
  line-height: 31px;
  font-weight: 400;
  color: #bfd0e0;
  padding: 16px 26px;
  margin: 0;
`

const Subtitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #a0afbd;
`

const MetaLinks = styled.div`
  display: flex;
  margin: 16px 0;
`

const MetaLink = styled(Link)`
  color: #75b5ff;
  text-decoration: none;
  border-bottom: 1px solid;
  font-size: 16px;

  & + & {
    margin-left: 24px;
  }

  &:hover,
  &:focus {
    color: ${lighten(0.1, "#75b5ff")};
  }
`

const Content = styled.div`
  padding: 0 18px;
  color: #a0afbd;
`

const SubContent = styled.div`
  margin-left: 10px;
  font-size: 16px;
`

const StyledCode = styled(Code)`
  margin: 0 calc(-18px - 11px);
  padding-left: calc(18px + 11px);
  padding-right: calc(18px + 11px);
  background: #171f26;
`

const InlineCode = styled.code`
  border-radius: 4px;
  display: inline-block;
  background: #171f26;
  color: #74a9f2;
  padding: 6px 10px;
`

const Method = ({ name, ...restProps }: MethodProps): JSX.Element => (
  <MethodWrapper {...restProps}>
    <Name>_.{name}</Name>

    <Content>
      <MetaLinks>
        <MetaLink to="/">source</MetaLink>
        <MetaLink to="/">npm package</MetaLink>
      </MetaLinks>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem
        ullam obcaecati sit sequi, eaque sint id, nostrum at neque deleniti a
        sed quas fugit repellat corrupti ut dolore omnis?
      </p>

      <p>
        <b>Note:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <Subtitle>Since</Subtitle>
      <SubContent>1.0</SubContent>

      <Subtitle>Arguments</Subtitle>
      <SubContent>...</SubContent>

      <Subtitle>Returns</Subtitle>
      <SubContent>
        <InlineCode>(array)</InlineCode>
      </SubContent>

      <Subtitle>Example</Subtitle>
      <StyledCode>
        {`var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The \`_.matches\` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The \`_.matchesProperty\` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The \`_.property\` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']`}
      </StyledCode>
    </Content>
  </MethodWrapper>
)

export default Method

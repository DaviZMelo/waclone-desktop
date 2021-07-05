import { shade } from 'polished';
import styled from 'styled-components';

interface ItemProps {
  isSelected: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
      margin-top: 50px;
    }
  }
`;

export const Options = styled.main`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Option = styled.aside``;

export const OptionContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;

  h4 {
    margin: 24px 0;
  }
`;

export const OptionTitle = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 12px;
    height: 25px;
    width: 25px;
  }
`;

export const Title = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 30px;
    height: 30px;

    margin-right: 12px;
  }

  margin-bottom: 60px;
`;

export const GroupList = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    display: flex;
    flex-direction: column;
    flex: 1;
    list-style: none;
    align-items: center;
    justify-content: center;

    > img {
      margin-top: 120px;
    }
  }
`;

export const GroupSelect = styled.div`
  user-select: none;
  margin-top: 18px;
`;

export const Item = styled.li<ItemProps>`
  h3 {
    margin-left: auto;
    margin-right: 12px;
  }

  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  user-select: none;

  align-items: center;
  flex-direction: row;

  & + li {
    margin-top: 16px;
  }

  h2 {
    margin-left: 22px;
  }

  > img,
  > svg {
    width: 80px;
    height: 80px;
  }

  img {
    border-radius: 50%;
  }

  &:hover {
    background-color: ${shade(0.2, '#FFF')};
    transition: 0.2s;
  }
`;

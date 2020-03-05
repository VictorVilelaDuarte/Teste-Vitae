import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 6px;
  max-width: 900px;
  margin: 75px auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid white;
`;

export const FilterRow = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(90, 90, 90, 0.2);
`;

export const FilterInput = styled.input`
  height: 50px;
  width: 180px;
  border: 1px solid #2d5cb5;
  border-radius: 6px;
  color: #2d5cb5;
  padding-left: 3px;
  font-size: 16px;
  align-self: flex-start;
`;

export const Table = styled.table`
  margin-top: 10px;
  overflow: auto;
  height: 430px;
  max-height: 430px;
  width: 100%;
  border: none;
`;

export const TableHead = styled.th``;

export const TableRow = styled.tr`
  border: none;
  &:nth-child(even) {
    background-color: rgba(121, 121, 121, 0.5);
  }
`;

export const TableCell = styled.td`
  border: none;
  text-align: center;
`;

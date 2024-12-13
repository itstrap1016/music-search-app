import styled from 'styled-components';

export const PopupOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const PopupArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  max-height: 800px;
  gap: 40px;
`;
export const ImgContainer = styled.div`
  width: 200px;
`;
export const Img = styled.img`
  width: 100%;
  height: 200px;
  display: block;
`;
export const TextContainer = styled.div`
  width: calc(100% - 240px);
  width: 320px;
`;
export const TitleContainer = styled.div``;
export const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 15px;
  line-height: 1.25;
  word-break: brea-word;
`;
export const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.mediumGray};
  width: 100%;
  line-height: 1.25;
`;
export const Summary = styled.p`
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-height: 1.5;
`;
export const Tags = styled.div`
  margin-top: 10px;
  word-break: brea-word;
`;
export const Tag = styled.a`
  color: ${(props) => props.theme.colors.primaryColor};
  font-size: 14px;
  line-height: 1.25;
  display: inline-block;
`;
export const MoreInfo = styled.a`
  color: ${(props) => props.theme.colors.primaryColor};
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
`;
export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.black};
  font-size: 20px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  right: -20px;
  color: ${(props) => props.theme.colors.white};
`;
export const Tracks = styled.ul`
  margin-bottom: 10px;
  max-height: 600px;

  &.overflow {
    overflow-y: scroll;
  }
`;
export const Track = styled.li`
  &:first-child {
    padding-top: 0;
  }
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

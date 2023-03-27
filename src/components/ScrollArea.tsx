import * as ScrollArea from "@radix-ui/react-scroll-area";
import styled from "styled-components";

export const SCROLLBAR_SIZE = "7px";

export const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  // ensures no selection
  user-select: none;
  // disable browser handling of all panning and zooming gestures on touch devices
  touch-action: none;
  padding: 2px;
  background-color: ${({ theme }) => theme.pageBackgroundColor};

  &[data-orientation="vertical"] {
    width: ${SCROLLBAR_SIZE};
  }
  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: ${SCROLLBAR_SIZE};
  }
`;

export const ScrollAreaThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background-color: #838383ed;
  border-radius: ${SCROLLBAR_SIZE};
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44;
    min-height: 44;
  }
`;

export const ScrollAreaCorner = styled(ScrollArea.Corner)`
  background: ${({ theme }) => theme.pageBackgroundColor};
`;

export const ScrollAreaRoot = styled(ScrollArea.Root)``;

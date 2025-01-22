export const createAnimation = (loaderName: string, frames: string, suffix: string): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  if (!styleSheet) {
    return animationName;
  }

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;
  try {
    styleSheet.insertRule(keyFrames, 0);
  } catch (e) {
    if (!(e instanceof DOMException)) {
      throw e;
    }

    const webkitKeyFrames = keyFrames.replace('@keyframes', '@-webkit-keyframes');
    styleSheet.insertRule(webkitKeyFrames, 0);
  }
  return animationName;
};

const onOpenCvReady = () => {
  // let src = cv.imread('img');
  // let dst = new cv.Mat();

  // load(src, dst);
  // Sobel_Canny();

  // recort(src, dst);

  load2();

  // src.delete();
  // dst.delete();
};

const load = (src, dst) => {
  cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY);
  cv.imshow('canvas1', dst);
};

const recort = (src, dst) => {
  let ksize = new cv.Size(5, 5);

  cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.Canny(dst, dst, 50, 100, 3, true);

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();

  cv.findContours(
    dst,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE
  );

  cv.imshow('canvas2', dst);
};

const load2 = () => {
  let src = cv.imread('img');
  let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY);

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();

  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  let size = contours.size();
  console.log(size);

  let cnt = contours.get(4);

  let rect = cv.boundingRect(cnt);
  let contoursColor = new cv.Scalar(255, 255, 255);
  let rectangleColor = new cv.Scalar(255, 0, 0);

  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);

  let point1 = new cv.Point(rect.x, rect.y);
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);

  cv.rectangle(dst, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
  cv.imshow('canvas3', dst);

  src.delete();
  dst.delete();

  contours.delete();
  hierarchy.delete();
  cnt.delete();
};

const Sobel_Canny = () => {
  let src = cv.imread('img');
  let dst1 = new cv.Mat();
  let dst2 = new cv.Mat();
  let dst3 = new cv.Mat();
  let dst4 = new cv.Mat();

  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);

  cv.Sobel(src, dst1, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Sobel(src, dst2, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Canny(src, dst3, 50, 100, 3, false);
  cv.Laplacian(src, dst4, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);

  // cv.imshow('canvas1', dst1);
  // cv.imshow('canvas2', dst2);
  cv.imshow('canvas1', dst3);
  cv.imshow('canvas2', dst4);

  src.delete();
  dst1.delete();
  dst2.delete();
  dst3.delete();
  dst4.delete();
};

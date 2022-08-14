package com.seven.opencv;

import org.opencv.core.Mat;
import org.opencv.core.Size;

import static org.opencv.core.Core.*;
import static org.opencv.core.CvType.CV_16S;
import static org.opencv.highgui.HighGui.*;
import static org.opencv.imgcodecs.Imgcodecs.imread;
import static org.opencv.imgproc.Imgproc.*;

public class DemoSobel extends BaseOpenCv {
    public static void main(String[] args) {
        Mat src, src_gray = new Mat();
        Mat grad = new Mat();
        String window_name = "Sobel Demo - Simple Edge Detector";
        int scale = 1;
        int delta = 0;
        int ddepth = CV_16S;

        int c;

        /// 装载图像
        src = imread("D:\\project\\xue_xi_qiang_guo\\openCV-study\\src\\main\\resources\\images\\screen_2022-08-13-17-56-49.png");
        if (src.empty()) {
            System.out.println("读取文件错误");
            return;
        }
        GaussianBlur(src, src, new Size(3, 3), 0, 0, BORDER_DEFAULT);
        /// 转换为灰度图
        cvtColor(src, src_gray, COLOR_RGB2GRAY);

        /// 创建显示窗口
        namedWindow(window_name, WINDOW_AUTOSIZE);

        /// 创建 grad_x 和 grad_y 矩阵
        Mat grad_x = new Mat(), grad_y = new Mat();
        Mat abs_grad_x = new Mat(), abs_grad_y = new Mat();

        /// 求 X方向梯度
        //Scharr( src_gray, grad_x, ddepth, 1, 0, scale, delta, BORDER_DEFAULT );
        Sobel(src_gray, grad_x, ddepth, 1, 0, 3, scale, delta, BORDER_DEFAULT);
        convertScaleAbs(grad_x, abs_grad_x);

        /// 求Y方向梯度
        //Scharr( src_gray, grad_y, ddepth, 0, 1, scale, delta, BORDER_DEFAULT );
        Sobel(src_gray, grad_y, ddepth, 0, 1, 3, scale, delta, BORDER_DEFAULT);
        convertScaleAbs(grad_y, abs_grad_y);

        /// 合并梯度(近似)
        addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0, grad);

        imshow(window_name, grad);

        waitKey(0);
    }
}
